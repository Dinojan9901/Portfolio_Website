'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowRight, FileDown, Github, Linkedin, Mail, Sparkles, Terminal, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export default function Hero({ onOpenResumeModal }: HeroProps) {
  const { personal } = portfolioData;

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--nav-height) + 2.5rem)',
        paddingBottom: '4.5rem',
        background: 'var(--gradient-dark-hero)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Profile Avatar with Glowing Ring */}
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                padding: '4px',
                background: 'var(--gradient-brand)',
                boxShadow: '0 0 35px rgba(59, 130, 246, 0.4), 0 8px 24px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <img
                src="/profile.jpg"
                alt={personal.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: 'var(--bg-tertiary)',
                }}
              />
            </div>
          </div>

          {/* Status Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div className="status-indicator">
              <span className="pulse-dot" />
              <span>Available for Software Engineering & AI Roles</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em',
            }}
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">
              {personal.name}
            </span>
          </h1>

          {/* Subtitle / Role */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              color: 'var(--text-secondary)',
              fontFamily: 'Outfit',
              fontWeight: 500,
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span>Full-Stack Software Engineer</span>
            <span style={{ color: 'var(--accent-blue)' }}>•</span>
            <span>AI / ML & RAG Architect</span>
            <span style={{ color: 'var(--accent-cyan)' }}>•</span>
            <span>Cloud & DevOps</span>
          </div>

          {/* Bio Description */}
          <p
            style={{
              fontSize: 'clamp(0.98rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '780px',
              margin: '0 auto 2.25rem auto',
            }}
          >
            {personal.bio}
          </p>

          {/* Location & Quick Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} color="var(--accent-cyan)" />
              <span>{personal.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={16} color="var(--accent-violet)" />
              <span>{personal.currentStatus}</span>
            </div>
          </div>

          {/* CTAs & Social Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
            }}
          >
            <a href="#projects" className="btn btn-primary">
              <span>Explore My Work</span>
              <ArrowRight size={18} />
            </a>

            <button onClick={onOpenResumeModal} className="btn btn-secondary">
              <FileDown size={18} />
              <span>Download CV (4 Tracks)</span>
            </button>

            <a href="#contact" className="btn btn-outline">
              <Mail size={18} />
              <span>Contact Me</span>
            </a>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.25rem' }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = 'var(--accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <Github size={20} />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = 'var(--accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {personal.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontFamily: 'Outfit',
                    fontWeight: 800,
                    background: 'var(--gradient-brand)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
