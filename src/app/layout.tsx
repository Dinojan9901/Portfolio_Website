import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dinojan-v.vercel.app'),
  title: 'Dinojan Vivekanantharasa | Full-Stack Developer & AI / DevOps Engineer',
  description: 'Portfolio of Dinojan Vivekanantharasa - Computer Engineering graduate (University of Ruhuna) and Full-Stack Developer working across web platforms, LLM/RAG systems, data pipelines, and cloud DevOps.',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Dinojan Vivekanantharasa | Full-Stack Developer & AI / DevOps Engineer',
    description: 'Production web platforms, LLM/RAG systems, data pipelines, and cloud DevOps.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0e17' },
    { media: '(prefers-color-scheme: light)', color: '#f4f7fb' },
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
