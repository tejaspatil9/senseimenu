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
            background: 'none',
            border: 'none',
            cursor: onChange ? 'pointer' : 'default',
            fontSize: 22,
            padding: 0,
            color: star <= (hover || value) ? '#C9A96E' : 'rgba(201,169,110,0.2)',
            transition: 'color 0.2s, transform 0.2s',
            transform: star <= (hover || value) ? 'scale(1.2)' : 'scale(1)'
          }}
        >
          ★
        </button>
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

      setRedirectMsg(true)

      setTimeout(() => {
        window.open(GOOGLE_REVIEW_URL, '_blank')
        setShowForm(false)
        setRedirectMsg(false)
        setRating(0)
        setName('')
        setText('')
      }, 1500)

      return
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    const updated = [newReview, ...reviews]

    setReviews(updated)

    try {
      localStorage.setItem('sensei_reviews', JSON.stringify(updated))
    } catch {}

    setSubmitted(true)

    setTimeout(() => {
      setShowForm(false)
      setSubmitted(false)
      setRating(0)
      setName('')
      setText('')
    }, 2000)
  }

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <section style={{ padding: '64px 20px' }}>

      {/* Header */}

      <div style={{ textAlign: 'center', marginBottom: 40 }}>

        <p className="section-tag">先生の評価</p>

        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 32,
          fontWeight: 400,
          color: 'var(--cream)',
          marginTop: 8
        }}>
          Guest Voices
        </h2>

        <div className="brush-divider" style={{ marginTop: 12 }} />

        {avgRating && (

          <div style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}>

            <span style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 28,
              color: 'var(--gold)'
            }}>
              {avgRating}
            </span>

            <div>
              <StarRating value={Math.round(Number(avgRating))} />

              <p style={{
                fontSize: 11,
                color: 'rgba(245,240,232,0.4)',
                marginTop: 2
              }}>
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>

          </div>
        )}
      </div>

      {/* Reviews */}

      {reviews.length > 0 && (

        <div style={{
          display: 'grid',
          gap: 16,
          maxWidth: 700,
          margin: '0 auto 32px'
        }}>

          {reviews.slice(0, 4).map(r => (

            <div key={r.id} className="review-card">

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8
              }}>

                <div style={{ display: 'flex', gap: 10 }}>

                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--green-light), var(--green-dark))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cinzel',serif",
                    fontSize: 14,
                    color: 'var(--gold)'
                  }}>
                    {r.name.charAt(0).toUpperCase()}
                  </div>

                  <div>

                    <p style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 15,
                      color: 'var(--cream)'
                    }}>
                      {r.name}
                    </p>

                    <p style={{
                      fontSize: 10,
                      color: 'rgba(245,240,232,0.3)'
                    }}>
                      {r.date}
                    </p>

                  </div>
                </div>

                <StarRating value={r.rating} />

              </div>

              <p style={{
                fontSize: 14,
                color: 'rgba(245,240,232,0.65)',
                fontStyle: 'italic',
                lineHeight: 1.7
              }}>
                “{r.text}”
              </p>

            </div>
          ))}

        </div>
      )}

      {/* CTA */}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center',
        maxWidth: 400,
        margin: '0 auto'
      }}>

        <button
          className="cta-btn"
          style={{ width: '100%' }}
          onClick={() => setShowForm(true)}
        >
          ✦ Share Your Experience
        </button>

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '12px 32px',
            border: '1px solid rgba(201,169,110,0.25)',
            color: 'rgba(245,240,232,0.5)',
            textDecoration: 'none',
            width: '100%',
            textAlign: 'center'
          }}
        >
          ★ View on Google
        </a>

      </div>

    </section>
  )
}