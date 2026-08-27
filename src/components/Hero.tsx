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
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '4rem',
        background: 'var(--gradient-dark-hero)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Blur Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Status Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <div className="status-indicator">
              <span className="pulse-dot" />
              <span>Available for Software Engineering & AI Roles</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              lineHeight: 1.1,
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
              gap: '0.75rem',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
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
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
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
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
