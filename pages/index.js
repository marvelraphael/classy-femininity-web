// pages/index.js
export default function Home() {
  async function subscribe() {
    const res = await fetch('/api/checkout', { method: 'POST' });
    const { url } = await res.json();
    window.location = url;
  }

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h1>Choose your plan</h1>
      <button
        onClick={subscribe}
        style={{
          marginTop: 20,
          padding: '12px 24px',
          background: '#b20235',
          color: '#fff',
          border: 'none',
          borderRadius: 4
        }}
      >
        Subscribe Monthly
      </button>
    </div>
  );
}
