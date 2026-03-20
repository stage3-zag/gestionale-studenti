import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaStudenti from './pages/ListaStudenti'
import DettaglioStudente from './pages/DettaglioStudente'

export const API = 'http://localhost:8080/studenti'

export function calcolaMediaTotale(studente) {
  const voti = studente.voti || {}
  const tutti = Object.values(voti).flat()
  if (tutti.length === 0) return null
  return (tutti.reduce((a, v) => a + v, 0) / tutti.length).toFixed(1)
}

export default function App() {
  const [studenti, setStudenti] = useState([])
  const [dark, setDark] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => { setStudenti(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const bg    = dark ? '#1C1F2E' : '#F0F4FF'
  const blob1 = dark ? 'rgba(94,234,212,0.07)' : 'rgba(94,234,212,0.12)'
  const blob2 = dark ? 'rgba(192,132,252,0.06)' : 'rgba(192,132,252,0.1)'

  return (
    <BrowserRouter>
      <div style={{ minHeight:'100vh', background:bg, padding:'48px 24px 80px', position:'relative', overflow:'hidden', transition:'background 0.3s' }}>
        <div style={{ position:'absolute', top:'-120px', left:'-100px', width:'480px', height:'480px', background:`radial-gradient(circle, ${blob1} 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', right:'-80px', width:'420px', height:'420px', background:`radial-gradient(circle, ${blob2} 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div style={{ maxWidth:'560px', margin:'0 auto', position:'relative', zIndex:1 }}>
          {loading ? (
            <div style={{ textAlign:'center', padding:'80px 0', fontFamily:'JetBrains Mono,monospace', fontSize:'13px', color:'#4B5070' }}>
              // caricamento in corso...
            </div>
          ) : (
            <Routes>
              <Route path="/"             element={<ListaStudenti     studenti={studenti} setStudenti={setStudenti} dark={dark} toggleDark={() => setDark(d => !d)} />} />
              <Route path="/studente/:id" element={<DettaglioStudente studenti={studenti} setStudenti={setStudenti} dark={dark} />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}