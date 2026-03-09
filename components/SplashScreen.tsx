'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'show' | 'fade'>('show')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 2600)
    const t2 = setTimeout(() => onDone(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`splash-screen${phase === 'fade' ? ' hidden' : ''}`}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(27,77,62,0.6) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Wave rings */}
      {[80, 120, 160, 200].map((size, i) => (
        <div key={i} className="wave-ring" style={{
          width: size, height: size,
          animationDelay: `${i * 0.6}s`,
          animationDuration: `${3 + i * 0.4}s`
        }} />
      ))}

      {/* Logo */}
      <div style={{
        position: 'relative', zIndex: 10,
        opacity: phase === 'show' ? 1 : 0,
        transform: phase === 'show' ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24
      }}>
        <div style={{
          width: 140, height: 140,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1px solid rgba(201,169,110,0.4)',
          boxShadow: '0 0 60px rgba(201,169,110,0.2)',
          animation: 'fadeIn 1s ease forwards'
        }}>
          <Image src="/images/logo.png" alt="Sensei" width={140} height={140} style={{ objectFit: 'cover' }} priority />
        </div>

        <div style={{ textAlign: 'center', animation: 'fadeInUp 1.2s ease 0.4s both' }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: '6px',
            color: 'rgba(201,169,110,0.6)',
            textTransform: 'uppercase',
            marginBottom: 8
          }}>先生</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15,
            fontStyle: 'italic',
            color: 'rgba(201,169,110,0.5)',
            letterSpacing: '3px'
          }}>Modern Asian</p>
        </div>
      </div>

      {/* Loading bar */}
      <div style={{
        position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 1,
        background: 'rgba(201,169,110,0.15)',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%', background: 'var(--gold)',
          animation: 'loadBar 2.4s ease forwards'
        }} />
      </div>

      <style>{`
        @keyframes loadBar {
          0% { width: 0% }
          100% { width: 100% }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
