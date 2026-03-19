import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaStudenti from './pages/ListaStudenti'
import DettaglioStudente from './pages/DettaglioStudente'

export const studentiIniziali = [
  // Informatica
  { id: 1,  nome: 'Marco Rossi',       eta: 20, corso: 'Informatica', classe: '5A', voti: { Matematica: [8,7,9,8,9], Italiano: [7,6,8,7,7], Informatica: [9,10,9,10,9], Inglese: [8,7,8,9,8], Fisica: [7,8,7,6,8], Storia: [6,7,6,7,6] } },
  { id: 2,  nome: 'Luca Ferrari',      eta: 20, corso: 'Informatica', classe: '5A', voti: { Matematica: [9,8,10,9,9], Italiano: [6,7,6,5,7], Informatica: [10,10,9,10,10], Inglese: [7,8,7,6,8], Fisica: [9,8,9,10,9], Storia: [6,5,7,6,6] } },
  { id: 3,  nome: 'Andrea Conti',      eta: 19, corso: 'Informatica', classe: '4A', voti: { Matematica: [7,6,8,7,7], Italiano: [7,8,7,6,7], Informatica: [8,7,9,8,8], Inglese: [6,7,6,5,6], Fisica: [8,7,8,9,8], Storia: [7,6,7,8,7] } },
  { id: 4,  nome: 'Matteo Bruno',      eta: 19, corso: 'Informatica', classe: '4A', voti: { Matematica: [6,5,7,6,6], Italiano: [8,9,7,8,8], Informatica: [7,6,8,7,7], Inglese: [9,8,9,10,9], Fisica: [6,5,6,7,6], Storia: [8,7,8,9,8] } },
  { id: 5,  nome: 'Davide Greco',      eta: 18, corso: 'Informatica', classe: '3A', voti: { Matematica: [8,9,7,8,8], Italiano: [6,5,7,6,6], Informatica: [9,8,10,9,9], Inglese: [7,6,8,7,7], Fisica: [7,8,6,7,7], Storia: [6,7,5,6,6] } },
  { id: 6,  nome: 'Simone Ricci',      eta: 18, corso: 'Informatica', classe: '3A', voti: { Matematica: [7,6,8,7,7], Italiano: [7,8,6,7,7], Informatica: [8,7,9,8,8], Inglese: [8,9,7,8,8], Fisica: [6,5,7,6,6], Storia: [7,6,8,7,7] } },
  { id: 7,  nome: 'Filippo Marino',    eta: 17, corso: 'Informatica', classe: '2A', voti: { Matematica: [9,8,10,9,9], Italiano: [8,7,9,8,8], Informatica: [9,10,8,9,9], Inglese: [7,6,8,7,7], Fisica: [8,9,7,8,8], Storia: [7,8,6,7,7] } },
  { id: 8,  nome: 'Lorenzo Costa',     eta: 17, corso: 'Informatica', classe: '2A', voti: { Matematica: [6,5,7,6,6], Italiano: [6,7,5,6,6], Informatica: [7,6,8,7,7], Inglese: [6,5,7,6,6], Fisica: [6,7,5,6,6], Storia: [6,5,6,7,6] } },
  { id: 9,  nome: 'Giacomo Neri',      eta: 16, corso: 'Informatica', classe: '1A', voti: { Matematica: [8,7,9,8,8], Italiano: [7,8,6,7,7], Informatica: [8,9,7,8,8], Inglese: [8,7,9,8,8], Fisica: [7,6,8,7,7], Storia: [8,7,8,9,8] } },
  { id: 10, nome: 'Pietro Vitale',     eta: 16, corso: 'Informatica', classe: '1A', voti: { Matematica: [7,8,6,7,7], Italiano: [8,7,9,8,8], Informatica: [9,8,10,9,9], Inglese: [7,8,6,7,7], Fisica: [7,6,8,7,7], Storia: [7,8,7,6,7] } },
  // Design
  { id: 11, nome: 'Sara Bianchi',      eta: 20, corso: 'Design', classe: '5A', voti: { Matematica: [6,5,7,6,6], Italiano: [9,10,8,9,9], Informatica: [7,6,8,7,7], Inglese: [9,8,10,9,9], Fisica: [5,4,6,5,5], Storia: [9,8,10,9,9] } },
  { id: 12, nome: 'Giulia Moretti',    eta: 20, corso: 'Design', classe: '5A', voti: { Matematica: [5,4,6,5,5], Italiano: [8,9,7,8,8], Informatica: [6,5,7,6,6], Inglese: [8,7,9,8,8], Fisica: [5,6,4,5,5], Storia: [8,9,7,8,8] } },
  { id: 13, nome: 'Chiara Fontana',    eta: 19, corso: 'Design', classe: '4A', voti: { Matematica: [7,6,8,7,7], Italiano: [9,8,10,9,9], Informatica: [7,8,6,7,7], Inglese: [9,10,8,9,9], Fisica: [6,5,7,6,6], Storia: [8,7,9,8,8] } },
  { id: 14, nome: 'Alice Lombardi',    eta: 19, corso: 'Design', classe: '4A', voti: { Matematica: [6,7,5,6,6], Italiano: [8,7,9,8,8], Informatica: [6,5,7,6,6], Inglese: [7,8,6,7,7], Fisica: [6,7,5,6,6], Storia: [7,6,8,7,7] } },
  { id: 15, nome: 'Valentina Serra',   eta: 18, corso: 'Design', classe: '3A', voti: { Matematica: [8,7,9,8,8], Italiano: [9,10,8,9,9], Informatica: [8,7,9,8,8], Inglese: [8,9,7,8,8], Fisica: [7,6,8,7,7], Storia: [9,8,10,9,9] } },
  { id: 16, nome: 'Federica Gallo',    eta: 18, corso: 'Design', classe: '3A', voti: { Matematica: [6,5,7,6,6], Italiano: [7,8,6,7,7], Informatica: [6,7,5,6,6], Inglese: [8,7,9,8,8], Fisica: [5,4,6,5,5], Storia: [7,8,6,7,7] } },
  { id: 17, nome: 'Elisa Mancini',     eta: 17, corso: 'Design', classe: '2A', voti: { Matematica: [7,6,8,7,7], Italiano: [8,9,7,8,8], Informatica: [7,8,6,7,7], Inglese: [9,8,10,9,9], Fisica: [6,5,7,6,6], Storia: [8,7,9,8,8] } },
  { id: 18, nome: 'Beatrice Esposito', eta: 17, corso: 'Design', classe: '2A', voti: { Matematica: [5,6,4,5,5], Italiano: [9,8,10,9,9], Informatica: [5,4,6,5,5], Inglese: [8,9,7,8,8], Fisica: [5,6,4,5,5], Storia: [9,10,8,9,9] } },
  { id: 19, nome: 'Noemi Caruso',      eta: 16, corso: 'Design', classe: '1A', voti: { Matematica: [7,8,6,7,7], Italiano: [8,7,9,8,8], Informatica: [6,7,5,6,6], Inglese: [7,6,8,7,7], Fisica: [6,7,5,6,6], Storia: [8,7,9,8,8] } },
  { id: 20, nome: 'Aurora Pellegrini', eta: 16, corso: 'Design', classe: '1A', voti: { Matematica: [6,5,7,6,6], Italiano: [9,8,10,9,9], Informatica: [7,6,8,7,7], Inglese: [8,7,9,8,8], Fisica: [6,5,7,6,6], Storia: [8,9,7,8,8] } },
  // Marketing
  { id: 21, nome: 'Luca Romano',       eta: 20, corso: 'Marketing', classe: '5A', voti: { Matematica: [7,6,8,7,7], Italiano: [8,9,7,8,8], Informatica: [7,8,6,7,7], Inglese: [9,8,10,9,9], Fisica: [6,5,7,6,6], Storia: [8,7,9,8,8] } },
  { id: 22, nome: 'Martina Colombo',   eta: 20, corso: 'Marketing', classe: '5A', voti: { Matematica: [6,5,7,6,6], Italiano: [9,10,8,9,9], Informatica: [6,5,7,6,6], Inglese: [9,8,10,9,9], Fisica: [5,4,6,5,5], Storia: [9,8,10,9,9] } },
  { id: 23, nome: 'Riccardo De Luca',  eta: 19, corso: 'Marketing', classe: '4A', voti: { Matematica: [8,9,7,8,8], Italiano: [7,6,8,7,7], Informatica: [7,8,6,7,7], Inglese: [8,7,9,8,8], Fisica: [7,8,6,7,7], Storia: [7,6,8,7,7] } },
  { id: 24, nome: 'Alessia Barbieri',  eta: 19, corso: 'Marketing', classe: '4A', voti: { Matematica: [7,6,8,7,7], Italiano: [8,7,9,8,8], Informatica: [6,7,5,6,6], Inglese: [9,10,8,9,9], Fisica: [6,5,7,6,6], Storia: [8,9,7,8,8] } },
  { id: 25, nome: 'Tommaso Ferrara',   eta: 18, corso: 'Marketing', classe: '3A', voti: { Matematica: [6,7,5,6,6], Italiano: [7,8,6,7,7], Informatica: [7,6,8,7,7], Inglese: [8,7,9,8,8], Fisica: [6,7,5,6,6], Storia: [7,6,8,7,7] } },
  { id: 26, nome: 'Camilla Santoro',   eta: 18, corso: 'Marketing', classe: '3A', voti: { Matematica: [7,8,6,7,7], Italiano: [9,8,10,9,9], Informatica: [6,5,7,6,6], Inglese: [9,10,8,9,9], Fisica: [5,6,4,5,5], Storia: [9,8,10,9,9] } },
  { id: 27, nome: 'Francesco Rizzo',   eta: 17, corso: 'Marketing', classe: '2A', voti: { Matematica: [8,7,9,8,8], Italiano: [7,8,6,7,7], Informatica: [8,9,7,8,8], Inglese: [7,6,8,7,7], Fisica: [7,8,6,7,7], Storia: [7,8,6,7,7] } },
  { id: 28, nome: 'Giorgia Messina',   eta: 17, corso: 'Marketing', classe: '2A', voti: { Matematica: [6,5,7,6,6], Italiano: [8,9,7,8,8], Informatica: [6,7,5,6,6], Inglese: [8,7,9,8,8], Fisica: [6,5,7,6,6], Storia: [8,7,9,8,8] } },
  { id: 29, nome: 'Emanuele Ruggiero', eta: 16, corso: 'Marketing', classe: '1A', voti: { Matematica: [7,6,8,7,7], Italiano: [7,8,6,7,7], Informatica: [7,8,6,7,7], Inglese: [8,7,9,8,8], Fisica: [7,6,8,7,7], Storia: [7,8,6,7,7] } },
  { id: 30, nome: 'Sofia Cattaneo',    eta: 16, corso: 'Marketing', classe: '1A', voti: { Matematica: [8,7,9,8,8], Italiano: [8,9,7,8,8], Informatica: [7,8,6,7,7], Inglese: [9,8,10,9,9], Fisica: [7,8,6,7,7], Storia: [8,7,9,8,8] } },
]

// Calcola media totale di tutti i voti di uno studente
export function calcolaMediaTotale(studente) {
  const voti = studente.voti || {}
  const tutti = Object.values(voti).flat()
  if (tutti.length === 0) return null
  return (tutti.reduce((a, v) => a + v, 0) / tutti.length).toFixed(1)
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`

export default function App() {
  const [studenti, setStudenti] = useState(studentiIniziali)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const bg   = dark ? '#1C1F2E' : '#F0F4FF'
  const blob1 = dark ? 'rgba(94,234,212,0.07)' : 'rgba(94,234,212,0.12)'
  const blob2 = dark ? 'rgba(192,132,252,0.06)' : 'rgba(192,132,252,0.1)'

  return (
    <BrowserRouter>
      <div style={{ minHeight:'100vh', background:bg, padding:'48px 24px 80px', position:'relative', overflow:'hidden', transition:'background 0.3s' }}>
        <div style={{ position:'absolute', top:'-120px', left:'-100px', width:'480px', height:'480px', background:`radial-gradient(circle, ${blob1} 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', right:'-80px', width:'420px', height:'420px', background:`radial-gradient(circle, ${blob2} 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div style={{ maxWidth:'560px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <Routes>
            <Route path="/"            element={<ListaStudenti    studenti={studenti} setStudenti={setStudenti} dark={dark} toggleDark={() => setDark(d => !d)} />} />
            <Route path="/studente/:id" element={<DettaglioStudente studenti={studenti} dark={dark} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
