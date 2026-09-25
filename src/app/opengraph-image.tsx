import { ImageResponse } from 'next/og';

// Edge runtime: avoids a Next 14 bug where the Node.js image renderer fails to build on Windows.
export const runtime = 'edge';
export const alt ='Dinojan Vivekanantharasa - Full-Stack Developer & AI / DevOps Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Social preview card shown when the portfolio link is shared (LinkedIn, WhatsApp, Slack, X).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0e17 0%, #111a2e 60%, #1e1b4b 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#22d3ee', marginBottom: 24 }}>
          dinojan-v.vercel.app
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>
          Dinojan Vivekanantharasa
        </div>
        <div style={{ display: 'flex', fontSize: 38, color: '#93c5fd', marginTop: 20 }}>
          Full-Stack Developer & AI / DevOps Engineer
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#cbd5e1', marginTop: 36 }}>
          React · Node.js · TypeScript · LLM / RAG · Kafka · Docker · AWS
        </div>
      </div>
    ),
    size,
  );
}
