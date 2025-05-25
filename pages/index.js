// pages/index.js
export default function Home() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h1>Choose your plan</h1>
      <button
        onClick={() => window.location.href = '/api/checkout'}
        style={{
          marginTop: 20, padding: '12px 24px',
          background: '#b20235', color: '#fff',
          border: 'none', borderRadius: 4
        }}
      >
        Subscribe Monthly
      </button>
    </div>
  )
}
