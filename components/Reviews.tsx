'use client'
import { useState, useEffect } from 'react'

type Review = {
  id: string
  name: string
  rating: number
  text: string
  date: string
}

const GOOGLE_REVIEW_URL = 'https://maps.google.com/maps?cid=sensei+modern+asian+pimpri'

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default',
            fontSize: 22, padding: 0,
            color: star <= (hover || value) ? '#C9A96E' : 'rgba(201,169,110,0.2)',
            transition: 'color 0.2s, transform 0.2s',
            transform: star <= (hover || value) ? 'scale(1.2)' : 'scale(1)'
          }}
        >★</button>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [redirectMsg, setRedirectMsg] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sensei_reviews')
      if (saved) setReviews(JSON.parse(saved))
    } catch {}
  }, [])

  const handleRatingSelect = (r: number) => setRating(r)

  const handleSubmit = () => {
    if (!rating || !name.trim() || !text.trim()) return

    if (rating >= 4) {
      // Redirect to Google
      setRedirectMsg(true)
      setTimeout(() => {
        window.open(GOOGLE_REVIEW_URL, '_blank')
        setShowForm(false)
        setRedirectMsg(false)
        setRating(0); setName(''); setText('')
      }, 1500)
      return
    }

    // Save locally (1-3 stars)
    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }
    const updated = [newReview, ...reviews]
    setReviews(updated)
    try { localStorage.setItem('sensei_reviews', JSON.stringify(updated)) } catch {}
    setSubmitted(true)
    setTimeout(() => {
      setShowForm(false)
      setSubmitted(false)
      setRating(0); setName(''); setText('')
    }, 2000)
  }

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <section style={{ padding: '64px 20px' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <p className="section-tag">先生の評価</p>
        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 32, fontWeight: 400,
          color: 'var(--cream)', marginTop: 8
        }}>Guest Voices</h2>
        <div className="brush-divider" style={{ marginTop: 12 }} />
        {avgRating && (
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: 28, color: 'var(--gold)' }}>{avgRating}</span>
            <div>
              <StarRating value={Math.round(Number(avgRating))} />
              <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', marginTop: 2 }}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        )}
      </div>

      {/* Reviews grid */}
      {reviews.length > 0 && (
        <div style={{ display: 'grid', gap: 16, marginBottom: 32, maxWidth: 700, margin: '0 auto 32px' }}>
          {reviews.slice(0, 4).map(r => (
            <div key={r.id} className="review-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--green-light), var(--green-dark))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Cinzel',serif", fontSize: 14, color: 'var(--gold)',
                    border: '1px solid rgba(201,169,110,0.3)'
                  }}>
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: 'var(--cream)' }}>{r.name}</p>
                    <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.3)' }}>{r.date}</p>
                  </div>
                </div>
                <StarRating value={r.rating} />
              </div>
              <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.65)', fontStyle: 'italic', lineHeight: 1.7 }}>&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
      )}

      {/* CTA buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', maxWidth: 400, margin: '0 auto' }}>
        <button
          className="cta-btn"
          style={{ width: '100%' }}
          onClick={() => setShowForm(true)}
        >
          <span>✦ Share Your Experience</span>
        </button>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: '12px 32px', width: '100%',
            border: '1px solid rgba(201,169,110,0.25)',
            color: 'rgba(245,240,232,0.5)', fontSize: 12,
            fontFamily: "'Cinzel',serif", letterSpacing: 2,
            textDecoration: 'none', transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.5)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.25)'; (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.5)' }}
        >
          <span>★</span> View on Google
        </a>
      </div>

      {/* Review form modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(7,15,11,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20
        }} onClick={e => { if (e.target === e.currentTarget) { setShowForm(false); setRating(0); setName(''); setText('') } }}>
          <div style={{
            background: 'var(--dark2)',
            border: '1px solid rgba(201,169,110,0.3)',
            padding: 32, maxWidth: 440, width: '100%',
            animation: 'fadeInUp 0.4s ease'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>🙏</p>
                <p style={{ fontFamily: "'Cinzel',serif", color: 'var(--gold)', letterSpacing: 2 }}>Thank You!</p>
                <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.5)', marginTop: 8 }}>Your feedback has been saved.</p>
              </div>
            ) : redirectMsg ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: 40, marginBottom: 12 }}>⭐</p>
                <p style={{ fontFamily: "'Cinzel',serif", color: 'var(--gold)', letterSpacing: 2 }}>Redirecting to Google</p>
                <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.5)', marginTop: 8 }}>Sharing your wonderful experience...</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 16, letterSpacing: 2, color: 'var(--gold)' }}>Your Review</h3>
                  <button className="close-btn" style={{ width: 32, height: 32, fontSize: 14 }} onClick={() => { setShowForm(false); setRating(0); setName(''); setText('') }}>✕</button>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)', marginBottom: 10, letterSpacing: 1, fontFamily: "'Cinzel',serif", textTransform: 'uppercase', fontSize: 10 }}>Rate Your Experience</p>
                  <StarRating value={rating} onChange={handleRatingSelect} />
                  {rating >= 4 && (
                    <p style={{ fontSize: 11, color: 'var(--gold)', marginTop: 8, fontStyle: 'italic' }}>
                      ✦ You&apos;ll be redirected to Google Reviews to share your kind words
                    </p>
                  )}
                  {rating > 0 && rating < 4 && (
                    <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', marginTop: 8, fontStyle: 'italic' }}>
                      We&apos;d love to know how we can do better
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    style={{
                      width: '100%', background: 'rgba(27,77,62,0.15)',
                      border: '1px solid rgba(201,169,110,0.2)', padding: '12px 14px',
                      color: 'var(--cream)', fontSize: 14,
                      fontFamily: "'Cormorant Garamond',serif",
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    style={{
                      width: '100%', background: 'rgba(27,77,62,0.15)',
                      border: '1px solid rgba(201,169,110,0.2)', padding: '12px 14px',
                      color: 'var(--cream)', fontSize: 14, resize: 'none',
                      fontFamily: "'Cormorant Garamond',serif",
                      outline: 'none', fontStyle: 'italic'
                    }}
                  />
                </div>

                <button
                  className="cta-btn"
                  style={{ width: '100%', opacity: (!rating || !name || !text) ? 0.5 : 1 }}
                  onClick={handleSubmit}
                  disabled={!rating || !name.trim() || !text.trim()}
                >
                  <span>{rating >= 4 ? '★ Share on Google' : '✦ Submit Feedback'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes fadeInUp { from { opacity:0;transform:translateY(20px); } to { opacity:1;transform:translateY(0); } }`}</style>
    </section>
  )
}
