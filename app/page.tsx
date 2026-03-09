'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import SplashScreen from '../components/SplashScreen'
import MenuOverlay from '../components/MenuOverlay'
import Reviews from '../components/Reviews'
import { specialDishes } from '../components/menuData'

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (splashDone) {
      setTimeout(() => setContentVisible(true), 100)
    }
  }, [splashDone])

  // Intersection observer for scroll animations
  useEffect(() => {
    if (!contentVisible) return
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.scroll-item').forEach(el => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [contentVisible])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <SplashScreen onDone={() => setSplashDone(true)} />

      {splashDone && (
        <main style={{ background: 'var(--dark)', minHeight: '100vh', opacity: contentVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>

          {/* ═══════════════════════════════════════════
              HERO SECTION
          ═══════════════════════════════════════════ */}
          <section style={{
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            padding: '40px 24px 60px'
          }}>
            {/* Ambient background */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(27,77,62,0.25) 0%, transparent 70%)'
            }} />

            {/* Decorative JP characters */}
            <div style={{
              position: 'absolute', top: '8%', right: '-5%',
              fontFamily: "'Noto Serif JP',serif",
              fontSize: 120, color: 'rgba(201,169,110,0.04)',
              userSelect: 'none', pointerEvents: 'none',
              lineHeight: 1
            }}>先生</div>
            <div style={{
              position: 'absolute', bottom: '5%', left: '-3%',
              fontFamily: "'Noto Serif JP',serif",
              fontSize: 90, color: 'rgba(27,77,62,0.15)',
              userSelect: 'none', pointerEvents: 'none',
            }}>食</div>

            {/* Logo + tagline */}
            <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 2 }} className="scroll-item visible">
              <Image src="/images/logo.png" alt="Sensei" width={90} height={90}
                style={{ borderRadius: '50%', border: '1px solid rgba(201,169,110,0.4)', marginBottom: 16 }} />
              <p className="section-tag" style={{ letterSpacing: 6 }}>先生</p>
              <h1 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 'clamp(36px,8vw,64px)',
                fontWeight: 400, letterSpacing: 2,
                color: 'var(--cream)', lineHeight: 1.1, marginTop: 8
              }}>Modern <em>Asian</em></h1>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(245,240,232,0.45)', marginTop: 8, letterSpacing: 2 }}>
                Inspired by Art. Driven by Flavour.
              </p>
            </div>

            {/* VIDEO in octagon/lantern shape */}
            <div style={{
              position: 'relative', width: '100%', maxWidth: 380, margin: '0 auto 40px',
              zIndex: 2
            }} className="scroll-item visible">
              {/* Gold frame border */}
              <div style={{
                position: 'absolute', inset: -2,
                clipPath: 'polygon(50% 0%, 92% 14%, 100% 50%, 92% 86%, 50% 100%, 8% 86%, 0% 50%, 8% 14%)',
                background: 'linear-gradient(135deg, rgba(201,169,110,0.8), rgba(201,169,110,0.2), rgba(201,169,110,0.8))',
                zIndex: 0
              }} />
              <div style={{
                clipPath: 'polygon(50% 0%, 92% 14%, 100% 50%, 92% 86%, 50% 100%, 8% 86%, 0% 50%, 8% 14%)',
                overflow: 'hidden',
                aspectRatio: '1',
                position: 'relative',
                zIndex: 1
              }}>
                <video
                  autoPlay muted loop playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src="/images/hero.mp4"
                />
                {/* Overlay tint */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(7,15,11,0.1), rgba(7,15,11,0.3))'
                }} />
              </div>
            </div>

            {/* CTA BUTTON */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }} className="scroll-item visible">
              <button
                className="cta-btn"
                onClick={() => setMenuOpen(true)}
                style={{ fontSize: 14, padding: '18px 56px' }}
              >
                <span>✦ View Menu</span>
              </button>
              <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.3)', letterSpacing: 2, fontFamily: "'Cinzel',serif", textTransform: 'uppercase' }}>
                探索する · Explore
              </p>
            </div>

            {/* Scroll indicator */}
            <div style={{
              position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 2
            }}>
              <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.5))', animation: 'scrollPulse 2s ease-in-out infinite' }} />
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              SIGNATURE DISHES
          ═══════════════════════════════════════════ */}
          <section style={{ padding: '60px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: 32, padding: '0 24px' }} className="scroll-item">
              <p className="section-tag">厨師のおすすめ</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, color: 'var(--cream)', marginTop: 8 }}>
                Signature <em>Dishes</em>
              </h2>
              <div className="brush-divider" style={{ marginTop: 12 }} />
            </div>

            {/* Horizontal scroll */}
            <div className="scroll-hide snap-scroll" style={{
              display: 'flex', overflowX: 'auto',
              gap: 16, paddingLeft: 24, paddingRight: 24,
              paddingBottom: 8
            }}>
              {specialDishes.map((dish, i) => (
                <div key={i} className="snap-item scroll-item" style={{
                  minWidth: 220, flex: '0 0 220px',
                  position: 'relative', overflow: 'hidden',
                  border: '1px solid rgba(201,169,110,0.2)',
                  cursor: 'pointer',
                  animationDelay: `${i * 0.1}s`,
                  transition: 'transform 0.4s ease, border-color 0.4s ease'
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.6)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.2)'
                  }}
                >
                  <div style={{ height: 200, position: 'relative' }}>
                    <Image src={dish.img} alt={dish.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(7,15,11,0.85) 0%, transparent 60%)'
                    }} />
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(27,77,62,0.85)',
                      border: '1px solid rgba(201,169,110,0.4)',
                      padding: '4px 10px',
                      fontFamily: "'Cinzel',serif", fontSize: 9,
                      letterSpacing: 1.5, color: 'var(--gold)',
                      textTransform: 'uppercase'
                    }}>{dish.tag}</div>
                  </div>
                  <div style={{ padding: '14px 16px 16px', background: 'rgba(13,43,32,0.6)' }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: 'var(--cream)', lineHeight: 1.3 }}>{dish.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              AMBIENCE
          ═══════════════════════════════════════════ */}
          <section style={{ padding: '60px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: 32, padding: '0 24px' }} className="scroll-item">
              <p className="section-tag">雰囲気</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, color: 'var(--cream)', marginTop: 8 }}>
                Our <em>Ambience</em>
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: 'rgba(245,240,232,0.4)', marginTop: 8, fontSize: 15 }}>
                Inspired by art. Crafted with intention.
              </p>
              <div className="brush-divider" style={{ marginTop: 12 }} />
            </div>

            <div className="scroll-hide snap-scroll" style={{
              display: 'flex', overflowX: 'auto',
              gap: 16, paddingLeft: 24, paddingRight: 24
            }}>
              {['/images/ambience1.jpeg', '/images/ambience2.jpeg', '/images/ambience1.jpeg', '/images/ambience2.jpeg'].map((src, i) => (
                <div key={i} className="snap-item" style={{
                  minWidth: 280, flex: '0 0 280px',
                  height: 380, position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(201,169,110,0.15)'
                }}>
                  <Image src={src} alt={`Ambience ${i + 1}`} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(7,15,11,0.5) 0%, transparent 50%)'
                  }} />
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              REVIEWS
          ═══════════════════════════════════════════ */}
          <div className="scroll-item">
            <Reviews />
          </div>

          {/* ═══════════════════════════════════════════
              CONNECT
          ═══════════════════════════════════════════ */}
          <section style={{
            padding: '60px 24px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(13,43,32,0.3) 50%, transparent 100%)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }} className="scroll-item">
              <p className="section-tag">つながる</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, color: 'var(--cream)', marginTop: 8 }}>
                Connect <em>With Us</em>
              </h2>
              <div className="brush-divider" style={{ marginTop: 12 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, maxWidth: 400, margin: '0 auto' }} className="scroll-item">
              {/* WhatsApp */}
              <a href="https://wa.me/917900000000" target="_blank" rel="noopener noreferrer" className="connect-btn">
                <div className="icon" style={{ background: 'rgba(37,211,102,0.1)', borderColor: 'rgba(37,211,102,0.3)' }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>WhatsApp</span>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/sensei.asian/" target="_blank" rel="noopener noreferrer" className="connect-btn">
                <div className="icon" style={{ background: 'rgba(228,64,95,0.1)', borderColor: 'rgba(228,64,95,0.3)' }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="url(#ig)">
                    <defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>Instagram</span>
              </a>

              {/* Call */}
              <a href="tel:+917900000000" className="connect-btn">
                <div className="icon" style={{ background: 'rgba(201,169,110,0.1)', borderColor: 'rgba(201,169,110,0.3)' }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.05 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>Call Us</span>
              </a>

              {/* Map */}
              <a href="https://maps.google.com/?q=Sensei+Modern+Asian+Pimpri" target="_blank" rel="noopener noreferrer" className="connect-btn">
                <div className="icon" style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.3)' }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)' }}>Find Us</span>
              </a>
            </div>

            {/* Address */}
            <div style={{ textAlign: 'center', marginTop: 32 }} className="scroll-item">
              <p style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(245,240,232,0.35)', lineHeight: 1.8 }}>
                Sensei — Modern Asian<br />
                Pimpri-Chinchwad, Maharashtra
              </p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              FOOTER / TABLE OS BRANDING
          ═══════════════════════════════════════════ */}
          <footer style={{
            borderTop: '1px solid rgba(201,169,110,0.1)',
            padding: '32px 24px',
            textAlign: 'center',
            background: 'rgba(7,15,11,0.8)'
          }}>
            <Image src="/images/logo.png" alt="Sensei" width={40} height={40}
              style={{ borderRadius: '50%', border: '1px solid rgba(201,169,110,0.2)', margin: '0 auto 16px' }} />
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 16, letterSpacing: 4, color: 'var(--gold)', marginBottom: 4 }}>SENSEI</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 13, color: 'rgba(245,240,232,0.3)', marginBottom: 24 }}>先生 · Modern Asian</p>

            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.3),transparent)', margin: '0 auto 20px' }} />

            {/* TABLE OS Branding */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1px solid rgba(201,169,110,0.1)',
              padding: '10px 20px',
              background: 'rgba(27,77,62,0.08)'
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '4px',
                background: 'linear-gradient(135deg, var(--green), var(--green-dark))',
                border: '1px solid rgba(201,169,110,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cinzel',serif", fontSize: 10, color: 'var(--gold)'
              }}>T</div>
              <div>
                <p className="powered-by" style={{ textAlign: 'left', fontSize: 8 }}>POWERED BY</p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: 2, color: 'var(--gold)' }}>TABLE OS</p>
                <p className="powered-by" style={{ textAlign: 'left', fontSize: 8 }}>DIGITAL MENU</p>
              </div>
            </div>

            <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.15)', marginTop: 20, fontStyle: 'italic' }}>
              © 2025 Sensei Modern Asian. All rights reserved.
            </p>
          </footer>
        </main>
      )}

      {/* MENU OVERLAY */}
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 0.8; transform: scaleY(1); }
        }
      `}</style>
    </>
  )
}
