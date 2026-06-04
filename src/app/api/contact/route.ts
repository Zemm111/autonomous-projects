import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting store
// In production, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Array.from(rateLimitStore.entries()).forEach(([ip, data]) => {
    if (data.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  });
}, 5 * 60 * 1000);

interface ContactFormData {
  inquiry: string;
  name: string;
  email: string;
  company?: string;
  honeypot?: string;
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 5000); // Limit length
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const hourInMs = 60 * 60 * 1000;
  const maxRequests = 5;

  const record = rateLimitStore.get(ip);
  
  if (!record || record.resetTime < now) {
    // New or expired record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + hourInMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

async function sendTelegramNotification(data: {
  inquiry: string;
  name: string;
  email: string;
  company?: string;
}): Promise<boolean> {
  try {
    const message = `🔔 New Contact Inquiry

📝 Inquiry:
${data.inquiry}

👤 Name: ${data.name}
📧 Email: ${data.email}
🏢 Company: ${data.company || 'Not provided'}`;

    // Use OpenClaw CLI to send message via Telegram
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    await execAsync(`openclaw message send --channel telegram --message ${JSON.stringify(message)}`);
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Origin validation
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://agenticapplications.com',
      'https://www.agenticapplications.com',
      'http://localhost:3000',
    ];

    if (!origin || !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }

    // 2. Rate limiting
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': '3600',
          },
        }
      );
    }

    // 3. Parse and validate body
    const body: ContactFormData = await request.json();

    // 4. Honeypot check
    if (body.honeypot) {
      // Bot detected, silently reject
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 5. Server-side validation
    const errors: string[] = [];

    if (!body.name || body.name.trim().length === 0) {
      errors.push('Name is required');
    }
    if (!body.email || body.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!isValidEmail(body.email)) {
      errors.push('Invalid email format');
    }
    if (!body.inquiry || body.inquiry.trim().length === 0) {
      errors.push('Inquiry is required');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    // 6. Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      inquiry: sanitizeInput(body.inquiry),
      company: body.company ? sanitizeInput(body.company) : undefined,
    };

    // 7. Send Telegram notification
    const notificationSent = await sendTelegramNotification(sanitizedData);

    if (!notificationSent) {
      console.error('Failed to send notification, but accepting submission');
      // Don't fail the request if notification fails - log it instead
    }

    // 8. Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your inquiry. We\'ll be in touch soon!' 
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
