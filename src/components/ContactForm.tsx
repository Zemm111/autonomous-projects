'use client';

import { useState, FormEvent } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface FormState {
  inquiry: string;
  name: string;
  email: string;
  company: string;
  honeypot: string; // Hidden field for bot detection
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    inquiry: '',
    name: '',
    email: '',
    company: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.inquiry.trim()) {
      newErrors.inquiry = 'Please tell us about your inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading' });
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: data.message || 'Thank you! We\'ll be in touch soon.' 
        });
        setFormData({
          inquiry: '',
          name: '',
          email: '',
          company: '',
          honeypot: '',
        });
      } else if (response.status === 429) {
        setStatus({ 
          type: 'error', 
          message: 'Too many submissions. Please try again later.' 
        });
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-content mx-auto space-y-8">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      {/* Inquiry */}
      <ScrollReveal delay={0.1}>
        <div>
          <label 
            htmlFor="inquiry" 
            className="block font-display text-h3 mb-4"
          >
            What would you like to discuss?
          </label>
          <textarea
            id="inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 font-body text-body bg-white border-2 rounded-none transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.inquiry
                ? 'border-red-500'
                : 'border-grey-light focus:border-blue-brand'
            }`}
            placeholder="Tell us about your idea, project, or question..."
            disabled={status.type === 'loading' || status.type === 'success'}
          />
          {errors.inquiry && (
            <p className="mt-2 text-sm text-red-500">{errors.inquiry}</p>
          )}
        </div>
      </ScrollReveal>

      {/* Name */}
      <ScrollReveal delay={0.15}>
        <div>
          <label 
            htmlFor="name" 
            className="block font-display text-h3 mb-4"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 font-body text-body bg-white border-2 rounded-none transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.name
                ? 'border-red-500'
                : 'border-grey-light focus:border-blue-brand'
            }`}
            placeholder="John Doe"
            disabled={status.type === 'loading' || status.type === 'success'}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
      </ScrollReveal>

      {/* Email */}
      <ScrollReveal delay={0.2}>
        <div>
          <label 
            htmlFor="email" 
            className="block font-display text-h3 mb-4"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 font-body text-body bg-white border-2 rounded-none transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.email
                ? 'border-red-500'
                : 'border-grey-light focus:border-blue-brand'
            }`}
            placeholder="john@example.com"
            disabled={status.type === 'loading' || status.type === 'success'}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </ScrollReveal>

      {/* Company (optional) */}
      <ScrollReveal delay={0.25}>
        <div>
          <label 
            htmlFor="company" 
            className="block font-display text-h3 mb-4"
          >
            Company <span className="text-grey-mid text-body">(optional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 font-body text-body bg-white border-2 border-grey-light rounded-none transition-all duration-200 focus:outline-none focus:ring-0 focus:border-blue-brand"
            placeholder="Acme Inc."
            disabled={status.type === 'loading' || status.type === 'success'}
          />
        </div>
      </ScrollReveal>

      {/* Status Messages */}
      {status.message && (
        <ScrollReveal delay={0}>
          <div
            className={`p-4 border-2 ${
              status.type === 'success'
                ? 'bg-blue-50 border-blue-brand text-blue-brand'
                : 'bg-red-50 border-red-500 text-red-700'
            }`}
          >
            <p className="font-body text-body">{status.message}</p>
          </div>
        </ScrollReveal>
      )}

      {/* Submit Button */}
      <ScrollReveal delay={0.3}>
        <button
          type="submit"
          disabled={status.type === 'loading' || status.type === 'success'}
          className={`w-full py-4 px-8 font-display text-h3 transition-all duration-200 ${
            status.type === 'loading' || status.type === 'success'
              ? 'bg-grey-light text-grey-mid cursor-not-allowed'
              : 'bg-black text-white hover:bg-blue-brand'
          }`}
        >
          {status.type === 'loading' 
            ? 'Sending...' 
            : status.type === 'success'
            ? 'Sent!'
            : 'Submit Inquiry'}
        </button>
      </ScrollReveal>

      {/* Privacy note */}
      <ScrollReveal delay={0.35}>
        <p className="text-grey-mid text-caption text-center uppercase">
          We respond to every inquiry personally, usually within 24 hours
        </p>
      </ScrollReveal>
    </form>
  );
}
