'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { BookOpen, Copy, Check, ExternalLink, Award, Users, BookmarkCheck } from 'lucide-react';

export default function PublicationSection() {
  const { publication } = portfolioData;
  const [copied, setCopied] = useState(false);

  const citationText = `${publication.authors.join(', ')}, "${publication.title}," in ${publication.venue}, ${publication.date}, ${publication.identifier}.`;

  const copyCitation = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(citationText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = citationText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy citation:', err);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="publication" className="section-wrapper" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag" style={{ borderColor: 'rgba(139, 92, 246, 0.3)', color: 'var(--accent-violet)', background: 'rgba(139, 92, 246, 0.1)' }}>
            Research & Publications
          </div>
          <h2 className="section-title">Academic Publication</h2>
          <p className="section-subtitle">
            Peer-reviewed research exploring LLM-based semantic assessment, heuristics, and natural language evaluation.
          </p>
        </div>

        {/* Featured Publication Card */}
        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
          <div
            className="glass-card"
            style={{
              padding: '2.5rem 2rem',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }}
            />

            {/* Publication Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="badge badge-purple">
                <Award size={14} />
                Peer-Reviewed Abstract
              </span>
              <span className="badge badge-emerald">
                <BookmarkCheck size={14} />
                {publication.identifier}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {publication.date}
              </span>
            </div>

            {/* Paper Title */}
            <h3
              style={{
                fontSize: '1.45rem',
                lineHeight: 1.35,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              {publication.title}
            </h3>

            {/* Authors */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              <Users size={18} color="var(--accent-violet)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Authors: </strong>
                {publication.authors.map((author, idx) => (
                  <span key={idx} style={{ fontWeight: author.includes('Dinojan') ? 700 : 400, color: author.includes('Dinojan') ? 'var(--accent-blue)' : 'inherit' }}>
                    {author}{idx < publication.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Venue */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              <BookOpen size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Venue: </strong>
                <span>{publication.venue}</span>
              </div>
            </div>

            {/* Abstract Summary */}
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
                padding: '1rem 1.25rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid var(--accent-violet)',
              }}
            >
              {publication.description}
            </p>

            {/* Tags & Action Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1.25rem',
              }}
            >
              {/* Highlight Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {publication.highlightTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.78rem',
                      fontFamily: 'Fira Code',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(139, 92, 246, 0.12)',
                      color: 'var(--accent-violet)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={copyCitation}
                  className="btn btn-secondary btn-sm"
                  aria-label="Copy paper citation"
                >
                  {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                  <span>{copied ? 'Citation Copied!' : 'Copy Citation'}</span>
                </button>

                {publication.link && (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink size={16} />
                    <span>View Project Code</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
