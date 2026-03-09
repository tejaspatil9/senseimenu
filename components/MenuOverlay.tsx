'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { menuData, MenuItem } from './menuData'

function PriceDisplay({ price }: { price: MenuItem['price'] }) {
  if (typeof price === 'string') {
    return <span className="price-tag">₹{price}</span>
  }
  const parts = Object.entries(price).map(([k, v]) => (
    <span key={k} style={{ marginRight: 8, fontSize: 13 }}>
      <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{k} </span>
      <span className="price-tag">₹{v}</span>
    </span>
  ))
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>{parts}</div>
}

function SpiceIndicator({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null
  return (
    <span style={{ marginLeft: 6, fontSize: 11 }}>
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} style={{ color: '#ef4444' }}>🌶</span>
      ))}
    </span>
  )
}

function DietDot({ item }: { item: MenuItem }) {
  if (item.isSignature) return <span className="sig-dot" title="Chef's Signature" />
  if (item.isVeg) return <span className="veg-dot" title="Vegetarian" />
  if (item.isNonVeg) return <span className="nonveg-dot" title="Non-Vegetarian" />
  return null
}

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState('small-plate-veg')
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const categories = menuData.map(s => ({ id: s.id, title: s.title, jp: s.jp }))

  const scrollToCategory = (id: string) => {
    setActiveCategory(id)
    const el = document.getElementById('menu-section-' + id)
    if (el && contentRef.current) {
      contentRef.current.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
    // scroll tab into view
    const tab = tabsRef.current?.querySelector(`[data-id="${id}"]`) as HTMLElement
    tab?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  // Update active tab on scroll
  useEffect(() => {
    const container = contentRef.current
    if (!container) return
    const handleScroll = () => {
      for (const cat of categories) {
        const el = document.getElementById('menu-section-' + cat.id)
        if (!el) continue
        const top = el.offsetTop - 100
        if (container.scrollTop >= top) setActiveCategory(cat.id)
      }
    }
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`menu-overlay${open ? ' open' : ''}`}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(7,15,11,0.97)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
        padding: '0 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/images/logo.png" alt="Sensei" width={36} height={36} style={{ borderRadius: '50%', border: '1px solid rgba(201,169,110,0.3)' }} />
            <div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, letterSpacing: 3, color: 'var(--gold)' }}>SENSEI</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(201,169,110,0.5)', letterSpacing: 2 }}>先生 · Modern Asian</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">✕</button>
        </div>

        {/* Category tabs */}
        <div ref={tabsRef} className="scroll-hide" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              data-id={cat.id}
              className={`category-tab${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <div ref={contentRef} style={{ overflowY: 'auto', height: 'calc(100vh - 120px)', paddingBottom: 80 }}>
        {/* Legend */}
        <div style={{ padding: '16px 20px', display: 'flex', gap: 20, flexWrap: 'wrap', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
          {[
            { dot: 'veg-dot', label: 'Vegetarian' },
            { dot: 'nonveg-dot', label: 'Non-Vegetarian' },
            { dot: 'sig-dot', label: "Chef's Signature" },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(245,240,232,0.5)' }}>
              <span className={dot} />
              {label}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(245,240,232,0.5)' }}>
            <span style={{ color: '#ef4444' }}>🌶</span> Spice level
          </div>
        </div>

        {menuData.map(section => (
          <div key={section.id} id={'menu-section-' + section.id}>
            {/* Section header */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(13,43,32,0.8) 0%, rgba(7,15,11,0.8) 100%)',
              padding: '32px 20px 16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', right: -10, top: -20,
                fontFamily: "'Noto Serif JP',serif",
                fontSize: 80, color: 'rgba(201,169,110,0.06)',
                userSelect: 'none', pointerEvents: 'none'
              }}>{section.jp}</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>
                {section.title}
              </div>
              <div style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 12, color: 'rgba(201,169,110,0.4)', marginTop: 4 }}>
                {section.jp}
              </div>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,var(--gold),transparent)', marginTop: 12 }} />
            </div>

            {/* Items */}
            <div style={{ padding: '0 20px' }}>
              {section.items.map((item, i) => (
                <div key={i} className="menu-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <DietDot item={item} />
                        <span style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 16, fontWeight: 600,
                          color: 'var(--cream-dark)',
                          lineHeight: 1.3
                        }}>{item.name}</span>
                        <SpiceIndicator level={item.spice} />
                      </div>
                      {item.description && (
                        <p style={{
                          fontSize: 12, color: 'rgba(245,240,232,0.4)',
                          marginTop: 4, lineHeight: 1.6,
                          fontStyle: 'italic'
                        }}>{item.description}</p>
                      )}
                      <div style={{ marginTop: 8 }}>
                        <PriceDisplay price={item.price} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '32px 20px 20px', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
          <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.25)', fontStyle: 'italic', lineHeight: 1.8 }}>
            Our dishes may include milk, soy, wheat, peanuts, sesame, or tree nuts.<br />
            If you have any food allergies or dietary restrictions, please inform our staff.<br />
            We take utmost care to ensure a safe and delightful dining experience.
          </p>
          <div style={{ marginTop: 20 }} className="powered-by">
            POWERED BY <span>TABLE OS</span> DIGITAL MENU
          </div>
        </div>
      </div>
    </div>
  )
}
