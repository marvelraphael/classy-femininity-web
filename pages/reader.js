// pages/reader.js
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import pdfjsLib from 'pdfjs-dist'

export default function Reader() {
  const router = useRouter()
  const { book } = router.query
  const canvasRef = useRef(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [page, setPage]   = useState(1)
  const [count, setCount] = useState(0)
  const [paid, setPaid]   = useState(false)

  // Load PDF
  useEffect(() => {
    if (!book) return
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'
    pdfjsLib.getDocument(`/ebooks/book-${book}.pdf`).promise
      .then(doc => { setPdfDoc(doc); setCount(doc.numPages) })
      .catch(() => alert('PDF failed to load.'))
  }, [book])

  // Render page
  useEffect(() => {
    if (!pdfDoc) return
    if (page > 5 && !paid) return
    pdfDoc.getPage(page).then(p => {
      const vp = p.getViewport({ scale: 1.5 })
      const c  = canvasRef.current
      c.height = vp.height; c.width = vp.width
      p.render({ canvasContext: c.getContext('2d'), viewport: vp })
    })
  }, [page, pdfDoc, paid])

  if (!pdfDoc) return <p style={{padding:24}}>Loading…</p>

  if (page > 5 && !paid) {
    return (
      <div style={{
        position:'fixed',top:0,left:0,right:0,bottom:0,
        background:'rgba(0,0,0,0.8)', color:'#fff',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center'
      }}>
        <p>You’ve reached your free preview (5 pages).</p>
        <button onClick={() => router.push('/')}>Subscribe</button>
      </div>
    )
  }

  return (
    <div>
      <canvas ref={canvasRef} style={{ display:'block', margin:'auto' }} />
      <div style={{
        position:'fixed', bottom:16, left:'50%',
        transform:'translateX(-50%)',
        background:'rgba(255,255,255,0.9)',
        padding:'8px 16px', borderRadius:6
      }}>
        <button onClick={()=>setPage(p=>Math.max(p-1,1))}>◀ Prev</button>
        <span style={{margin:'0 8px'}}>{page}/{count}</span>
        <button onClick={()=>setPage(p=>Math.min(p+1,count))}>Next ▶</button>
      </div>
    </div>
  )
}
