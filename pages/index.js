// pages/index.js
import Link from 'next/link'

export default function Home() {
  const books = Array.from({ length: 20 }, (_, i) => i + 1)

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: 'center' }}>Classy Femininity</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
          gap: 20,
          marginTop: 24
        }}
      >
        {books.map((id) => (
          <div key={id} style={{ textAlign: 'center' }}>
            <img
              src={`/covers/cover-${id}.jpg`}
              alt={`Book ${id}`}
              style={{
                width: '100%',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <br />
            <button
              onClick={() => window.location.href = `/reader?book=${id}`}
              style={{
                marginTop: 8,
                padding: '8px 16px',
                background: '#b20235',
                color: '#fff',
                border: 'none',
                borderRadius: 4
              }}
            >
              Read
            </button>
          </div>
        ))}
      </div>

      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          padding: 12,
          background: '#fff',
          borderTop: '1px solid #ddd'
        }}
      >
        <Link href="/"><a>Ebooks</a></Link>
        <Link href="/subscribe"><a>Subscribe</a></Link>
        <Link href="/decoder"><a>Man Decoder</a></Link>
      </nav>
    </div>
  )
}
