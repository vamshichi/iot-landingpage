'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interestType: 'attend',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        interestType: 'attend',
        message: '',
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="glow-text-cyan">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Want to register, sponsor, or partner? Fill out the form below and our team will be in touch shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-8">
              <div className="glass-dark p-6 rounded-xl border border-cyan-500/30">
                <h4 className="font-bold text-lg text-cyan-400 mb-2">Email</h4>
                <p className="text-muted-foreground">info@iotsummit.ae</p>
              </div>

              <div className="glass-dark p-6 rounded-xl border border-cyan-500/30">
                <h4 className="font-bold text-lg text-cyan-400 mb-2">Phone</h4>
                <p className="text-muted-foreground">+971 4 XXX XXXX</p>
              </div>

              <div className="glass-dark p-6 rounded-xl border border-cyan-500/30">
                <h4 className="font-bold text-lg text-cyan-400 mb-2">Location</h4>
                <p className="text-muted-foreground">Abu Dhabi International Convention Centre, Abu Dhabi, UAE</p>
              </div>

              <div className="glass-dark p-6 rounded-xl border border-cyan-500/30">
                <h4 className="font-bold text-lg text-cyan-400 mb-4">Response Time</h4>
                <p className="text-muted-foreground">
                  We typically respond to inquiries within 24 business hours. For urgent matters, please call us.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl border border-cyan-500/30">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 focus:outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 focus:outline-none transition-all"
                  placeholder="Your company"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 focus:outline-none transition-all"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 focus:outline-none transition-all"
                  placeholder="+971 50 XXX XXXX"
                />
              </div>

              {/* Interest Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">I&apos;m Interested In *</label>
                <select
                  name="interestType"
                  value={formData.interestType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground focus:border-cyan-400 focus:outline-none transition-all"
                >
                  <option value="attend">Attending Conference</option>
                  <option value="sponsor">Sponsorship</option>
                  <option value="partner">Partnership</option>
                  <option value="speak">Speaking Opportunity</option>
                  <option value="media">Media Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground placeholder-muted-foreground focus:border-cyan-400 focus:outline-none transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <div>
                    <p className="font-semibold text-green-400">Success!</p>
                    <p className="text-sm text-green-300">Thank you for your inquiry. We&apos;ll be in touch soon.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-400" />
                  <div>
                    <p className="font-semibold text-red-400">Error</p>
                    <p className="text-sm text-red-300">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Your information will only be used to contact you about your inquiry.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
