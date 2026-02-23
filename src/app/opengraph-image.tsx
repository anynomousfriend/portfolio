import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Subhankar — Blockchain & Full-Stack Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Bottom right glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '6px',
            border: '1px solid #27272a',
            background: 'rgba(24,24,27,0.6)',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
            }}
          />
          <span style={{ color: '#a1a1aa', fontSize: '13px', letterSpacing: '0.1em' }}>
            Available for hire
          </span>
        </div>

        {/* Label */}
        <div
          style={{
            color: 'rgba(129,140,248,0.7)',
            fontSize: '13px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Fullstack Web3 Dev With Taste
        </div>

        {/* Headline */}
        <div
          style={{
            color: '#fafafa',
            fontSize: '80px',
            fontWeight: 700,
            lineHeight: 0.95,
            marginBottom: '32px',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#d4d4d8' }}>Subhankar</span>
          <span style={{ color: '#6366f1' }}>.</span>
        </div>

        {/* Description */}
        <div
          style={{
            color: '#71717a',
            fontSize: '18px',
            lineHeight: 1.6,
            maxWidth: '680px',
          }}
        >
          Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#3f3f46',
            fontSize: '14px',
            letterSpacing: '0.05em',
          }}
        >
          subhankar.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
