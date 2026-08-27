'use client';

import React, { useEffect, useState } from 'react';
import { portfolioData, CVTrack } from '@/data/portfolioData';
import { X, Download, ExternalLink, Code, Brain, Cloud, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>('fullstack');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCV = portfolioData.cvTracks.find((t) => t.id === selectedTrack) || portfolioData.cvTracks[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code size={20} />;
      case 'Brain': return <Brain size={20} />;
      case 'Cloud': return <Cloud size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        zIndex: 9999,
      }}
    >
      <div
        className="glass-card modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '740px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.25rem 2rem',
          position: 'relative',
          border: '1.5px solid var(--border-glow)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--accent-blue)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.75rem', paddingRight: '2.5rem' }}>
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
            Curriculum Vitae Center
          </div>
          <h3 id="modal-title" style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
            Download Specialized CV / Resume
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Select the specialized CV profile that best aligns with the technical domain you are evaluating:
          </p>
        </div>

        {/* Track Selector Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.85rem',
            marginBottom: '1.75rem',
          }}
        >
          {portfolioData.cvTracks.map((track) => {
            const isSelected = track.id === selectedTrack;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrack(track.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1rem',
                  textAlign: 'left',
                  background: isSelected ? 'rgba(59, 130, 246, 0.16)' : 'var(--bg-tertiary)',
                  border: isSelected ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? track.badgeColor : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#ffffff' : track.badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {getIcon(track.iconName)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{track.name}</div>
                    {isSelected && <CheckCircle2 size={16} color="var(--accent-blue)" />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {track.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Selection Details & Download Action */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge" style={{ borderColor: currentCV.badgeColor, color: currentCV.badgeColor }}>
                {currentCV.fileName}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {currentCV.tagline}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'flex-end',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <a
              href={currentCV.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={16} />
              <span>Preview in Browser</span>
            </a>
            <a
              href={currentCV.filePath}
              download={currentCV.fileName}
              className="btn btn-primary btn-sm"
            >
              <Download size={16} />
              <span>Download {currentCV.name.split(' ')[0]} CV</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
