'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Send, Check, Copy, Github, Linkedin, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide a valid name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message of at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Get in Touch</div>
          <h2 className="section-title">Let&apos;s Build Something Great</h2>
          <p className="section-subtitle">
            Open for software engineering opportunities, AI research collaborations, and production consulting. Feel free to reach out!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            maxWidth: '1050px',
            margin: '0 auto',
          }}
        >
          {/* Contact Details & Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem' }}>
                Contact Information
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                I am actively considering software engineering and AI internship/full-time opportunities. Drop a message or email me directly!
              </p>

              {/* Direct Info List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Email Item */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <a
                    href={`mailto:${personal.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                    }}
                  >
                    <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
                      <Mail size={18} />
                    </div>
                    <span>{personal.email}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
                    aria-label="Copy email address"
                  >
                    {emailCopied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                    <span>{emailCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Phone Item */}
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  }}
                >
                  <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
                    <Phone size={18} />
                  </div>
                  <span>{personal.phone}</span>
                </a>

                {/* Location Item */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                  }}
                >
                  <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                    <MapPin size={18} />
                  </div>
                  <span>{personal.location}</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.85rem', fontWeight: 500 }}>
                  Social & Code Repositories:
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Form Card */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} color="var(--accent-blue)" />
              <span>Send a Direct Message</span>
            </h3>

            {isSubmitted ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--accent-emerald)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                  }}
                >
                  <Check size={28} />
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Message Received!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Thank you for reaching out. I will get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-tertiary)',
                      border: errors.name ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                  {errors.name && <span style={{ color: 'var(--accent-rose)', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-tertiary)',
                      border: errors.email ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                  {errors.email && <span style={{ color: 'var(--accent-rose)', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-tertiary)',
                      border: errors.message ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                  {errors.message && <span style={{ color: 'var(--accent-rose)', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
