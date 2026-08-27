'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import PublicationSection from '@/components/PublicationSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import VolunteerAchievements from '@/components/VolunteerAchievements';
import RefereesSection from '@/components/RefereesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed Navbar */}
      <Navbar onOpenResumeModal={openResumeModal} />

      {/* Main Page Flow */}
      <main>
        <Hero onOpenResumeModal={openResumeModal} />
        <Experience />
        <Projects />
        <PublicationSection />
        <SkillsSection />
        <EducationSection />
        <VolunteerAchievements />
        <RefereesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Multi-track CV Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
      />
    </div>
  );
}
