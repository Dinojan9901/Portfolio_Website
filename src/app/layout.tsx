import type { Metadata, Viewport } from 'next';
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
    url: 'https://dinojan-v.vercel.app',
    title: 'Dinojan Vivekanantharasa | Full-Stack Developer & AI / DevOps Engineer',
    description: 'Explore production web systems, LLM/RAG pipelines, microservices, and academic publications by Dinojan Vivekanantharasa.',
    siteName: 'Dinojan Vivekanantharasa Portfolio',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0e17' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('dinojan-theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
