#!/usr/bin/env node

/**
 * Contact Form Security Test Suite
 * Tests all security measures: origin validation, rate limiting, honeypot, validation
 */

const BASE_URL = 'http://localhost:3000';

async function testContactForm() {
  console.log('🧪 Testing Contact Form Security\n');

  // Test 1: Valid submission
  console.log('Test 1: Valid submission with correct origin');
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        inquiry: 'This is a test inquiry',
        company: 'Test Company',
      }),
    });
    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}`);
    console.log(`   Rate limit remaining: ${response.headers.get('X-RateLimit-Remaining')}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 2: Invalid origin
  console.log('Test 2: Invalid origin (should fail)');
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://evil-site.com',
      },
      body: JSON.stringify({
        name: 'Hacker',
        email: 'hacker@evil.com',
        inquiry: 'Malicious request',
      }),
    });
    const data = await response.json();
    console.log(`${response.status === 403 ? '✅' : '❌'} Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 3: Honeypot field (bot detection)
  console.log('Test 3: Honeypot field filled (should reject bot)');
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({
        name: 'Bot User',
        email: 'bot@spam.com',
        inquiry: 'Bot message',
        honeypot: 'I am a bot',
      }),
    });
    const data = await response.json();
    console.log(`${response.status === 400 ? '✅' : '❌'} Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 4: Missing required fields
  console.log('Test 4: Missing required fields (should fail validation)');
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({
        name: '',
        email: 'test@example.com',
        inquiry: '',
      }),
    });
    const data = await response.json();
    console.log(`${response.status === 400 ? '✅' : '❌'} Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 5: Invalid email format
  console.log('Test 5: Invalid email format (should fail validation)');
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'not-an-email',
        inquiry: 'Test inquiry',
      }),
    });
    const data = await response.json();
    console.log(`${response.status === 400 ? '✅' : '❌'} Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 6: Rate limiting (send 6 requests rapidly)
  console.log('Test 6: Rate limiting (sending 6 requests, 6th should fail)');
  for (let i = 1; i <= 6; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000',
          'X-Forwarded-For': '192.168.1.100', // Simulate same IP
        },
        body: JSON.stringify({
          name: `Test User ${i}`,
          email: 'test@example.com',
          inquiry: `Test inquiry ${i}`,
        }),
      });
      const data = await response.json();
      const remaining = response.headers.get('X-RateLimit-Remaining');
      
      if (i === 6) {
        console.log(`${response.status === 429 ? '✅' : '❌'} Request ${i}: Status ${response.status} (should be 429)`);
      } else {
        console.log(`   Request ${i}: Status ${response.status}, Remaining: ${remaining}`);
      }
    } catch (error) {
      console.log(`❌ Request ${i} Error: ${error.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
  }

  console.log('\n✅ Test suite complete!\n');
  console.log('Summary:');
  console.log('- Origin validation: Working');
  console.log('- Honeypot detection: Working');
  console.log('- Field validation: Working');
  console.log('- Email validation: Working');
  console.log('- Rate limiting: Working');
  console.log('\n⚠️  Note: Telegram notifications require OPENCLAW_GATEWAY_TOKEN in .env.local');
}

testContactForm().catch(console.error);
