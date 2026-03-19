import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaStudenti from './pages/ListaStudenti'
import DettaglioStudente from './pages/DettaglioStudente'

const studentiIniziali = [
  { id: 1, nome: 'Marco', eta: 20, corso: 'Informatica' },
  { id: 2, nome: 'Sara', eta: 22, corso: 'Design' },
  { id: 3, nome: 'Luca', eta: 21, corso: 'Marketing' },
  { id: 4, nome: 'Martina', eta: 23, corso: 'Informatica' },
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1C1F2E; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`

export default function App() {
  const [studenti, setStudenti] = useState(studentiIniziali)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#1C1F2E', padding: '48px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', left: '-100px', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<ListaStudenti studenti={studenti} setStudenti={setStudenti} />} />
            <Route path="/studente/:id" element={<DettaglioStudente studenti={studenti} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

