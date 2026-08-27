import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dinojan Vivekanantharasa | Full-Stack Developer & AI / DevOps Engineer',
  description: 'Portfolio of Dinojan Vivekanantharasa - Computer Engineering undergraduate at University of Ruhuna, Full-Stack Developer, AI/ML Researcher, and Cloud/DevOps Engineer.',
  keywords: [
    'Dinojan Vivekanantharasa',
    'Full Stack Developer',
    'Next.js Portfolio',
    'AI Engineer',
    'DevOps',
    'University of Ruhuna',
    'Computer Engineering',
    'RAG',
    'LLM Fine-Tuning',
    'AutoGradePro',
  ],
  authors: [{ name: 'Dinojan Vivekanantharasa' }],
  creator: 'Dinojan Vivekanantharasa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dinojan9901.github.io/Portfolio_Website/',
    title: 'Dinojan Vivekanantharasa | Full-Stack Developer & AI / DevOps Engineer',
    description: 'Explore production web systems, LLM/RAG pipelines, microservices, and academic publications by Dinojan Vivekanantharasa.',
    siteName: 'Dinojan Vivekanantharasa Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0e17" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
