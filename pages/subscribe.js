// pages/subscribe.js
export default function Subscribe() {
  async function startCheckout() {
    const res = await fetch('/api/checkout', { method: 'POST' })
    if (!res.ok) {
      console.error('Checkout API error', await res.text())
      return alert('Could not start checkout.')
    }
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h1>Choose your plan</h1>
      <button
        onClick={startCheckout}
        style={{
          marginTop: 20,
          padding: '12px 24px',
          background: '#b20235',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontSize: '1rem'
        }}
      >
        Subscribe Monthly
      </button>
    </div>
  )
}
