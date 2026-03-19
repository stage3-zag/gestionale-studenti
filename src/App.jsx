import { useState, useEffect } from 'react'

<<<<<<< HEAD
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
=======
const API = 'http://localhost:8080/studenti'

const corsoConfig = {
  Informatica: { color: '#5EEAD4', bg: 'rgba(94,234,212,0.12)', border: 'rgba(94,234,212,0.2)', icon: '⟨/⟩' },
  Design:      { color: '#C084FC', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.2)', icon: '◈' },
  Marketing:   { color: '#FCA5A5', bg: 'rgba(252,165,165,0.12)', border: 'rgba(252,165,165,0.2)', icon: '◎' },
}
const defaultCorso = { color: '#93C5FD', bg: 'rgba(147,197,253,0.12)', border: 'rgba(147,197,253,0.2)', icon: '◆' }
>>>>>>> 7868332434187a8c0874cd8f17a38660509732b2

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
<<<<<<< HEAD
  body { font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
=======
  body { background: #1C1F2E; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
  .root { min-height: 100vh; background: #1C1F2E; padding: 48px 24px 80px; position: relative; overflow: hidden; }
  .blob1 { position: absolute; top: -120px; left: -100px; width: 480px; height: 480px; background: radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 65%); pointer-events: none; }
  .blob2 { position: absolute; bottom: -80px; right: -80px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 65%); pointer-events: none; }
  .blob3 { position: absolute; top: 40%; left: 60%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(252,165,165,0.04) 0%, transparent 65%); pointer-events: none; }
  .container { max-width: 560px; margin: 0 auto; position: relative; z-index: 1; }
  .header { margin-bottom: 36px; }
  .header-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; color: #5EEAD4; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; opacity: 0.9; }
  .header-eyebrow::before { content: ''; width: 20px; height: 1px; background: #5EEAD4; opacity: 0.5; }
  .header-title { font-size: 36px; font-weight: 800; color: #EEF0FF; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 10px; }
  .header-title span { background: linear-gradient(135deg, #5EEAD4, #93C5FD); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .header-stats { display: flex; gap: 10px; margin-top: 18px; }
  .stat { background: #252839; border: 1px solid #2E3248; border-radius: 10px; padding: 10px 16px; text-align: center; min-width: 80px; }
  .stat-num { font-size: 20px; font-weight: 700; color: #EEF0FF; line-height: 1; margin-bottom: 3px; }
  .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4B5070; letter-spacing: 0.1em; text-transform: uppercase; }
  .form-panel { background: #252839; border: 1px solid #2E3248; border-radius: 20px; padding: 22px; margin-bottom: 20px; transition: border-color 0.3s, box-shadow 0.3s; }
  .form-panel:focus-within { border-color: rgba(94,234,212,0.25); box-shadow: 0 0 0 4px rgba(94,234,212,0.04); }
  .form-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #4B5070; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; }
  .form-row { display: grid; grid-template-columns: 1fr 90px; gap: 8px; margin-bottom: 8px; }
  .field input { width: 100%; padding: 11px 14px; background: #1C1F2E; border: 1px solid #2E3248; border-radius: 10px; color: #EEF0FF; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .field input::placeholder { color: #363A55; }
  .field input:focus { border-color: rgba(94,234,212,0.4); box-shadow: 0 0 0 3px rgba(94,234,212,0.06); }
  .btn-add { width: 100%; padding: 12px; background: linear-gradient(135deg, #5EEAD4, #3BCFBA); color: #1C1F2E; border: none; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.02em; transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s; margin-top: 8px; }
  .btn-add:hover { opacity: 0.92; box-shadow: 0 4px 20px rgba(94,234,212,0.22); }
  .btn-add:active { transform: scale(0.98); }
  .search-wrap { position: relative; margin-bottom: 6px; }
  .search-wrap input { width: 100%; padding: 12px 14px 12px 42px; background: #252839; border: 1px solid #2E3248; border-radius: 12px; color: #EEF0FF; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
  .search-wrap input::placeholder { color: #363A55; }
  .search-wrap input:focus { border-color: #3D4260; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #4B5070; font-size: 15px; pointer-events: none; }
  .list-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 4px 10px; }
  .list-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #4B5070; letter-spacing: 0.12em; text-transform: uppercase; }
  .list-count { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #4B5070; }
  .card { background: #252839; border: 1px solid #2E3248; border-radius: 16px; padding: 14px 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 14px; transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s; animation: fadeUp 0.35s ease both; }
>>>>>>> 7868332434187a8c0874cd8f17a38660509732b2
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .card:hover { border-color: #3D4260; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
  .avatar { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 800; flex-shrink: 0; letter-spacing: -0.02em; border: 1px solid transparent; transition: transform 0.2s; }
  .card:hover .avatar { transform: scale(1.06); }
  .card-body { flex: 1; min-width: 0; }
  .card-nome { font-size: 15px; font-weight: 700; color: #EEF0FF; margin-bottom: 5px; letter-spacing: -0.01em; }
  .card-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .card-eta { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #4B5070; }
  .dot { color: #2E3248; font-size: 10px; }
  .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.03em; font-family: 'JetBrains Mono', monospace; border: 1px solid transparent; }
  .btn-del { background: none; border: 1px solid #2E3248; color: #363A55; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; line-height: 1; }
  .btn-del:hover { border-color: rgba(252,165,165,0.35); color: #FCA5A5; background: rgba(252,165,165,0.07); transform: scale(1.1); }
  .empty { text-align: center; padding: 56px 0; color: #363A55; font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.08em; }
  .loading { text-align: center; padding: 56px 0; color: #4B5070; font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.08em; }
`

function getCfg(corso) { return corsoConfig[corso] || defaultCorso }

function Avatar({ nome, corso }) {
  const cfg = getCfg(corso)
  return (
    <div className="avatar" style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}>
      {nome.charAt(0).toUpperCase()}
    </div>
  )
}

function Badge({ corso }) {
  const cfg = getCfg(corso)
  return (
    <span className="badge" style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}>
      <span style={{ fontSize: '9px' }}>{cfg.icon}</span>
      {corso}
    </span>
  )
}

function StudenteCard({ nome, eta, corso, onElimina, index }) {
  return (
    <div className="card" style={{ animationDelay: `${index * 0.07}s` }}>
      <Avatar nome={nome} corso={corso} />
      <div className="card-body">
        <div className="card-nome">{nome}</div>
        <div className="card-meta">
          <span className="card-eta">{eta} anni</span>
          <span className="dot">·</span>
          <Badge corso={corso} />
        </div>
      </div>
      <button className="btn-del" onClick={onElimina} title="Elimina">×</button>
    </div>
  )
}

export default function App() {
<<<<<<< HEAD
  const [studenti, setStudenti] = useState(studentiIniziali)
  const [dark, setDark] = useState(true)
=======
  const [studenti, setStudenti] = useState([])
  const [filtro, setFiltro] = useState('')
  const [nuovoNome, setNuovoNome] = useState('')
  const [nuovaEta, setNuovaEta] = useState('')
  const [nuovoCorso, setNuovoCorso] = useState('')
  const [loading, setLoading] = useState(true)
>>>>>>> 7868332434187a8c0874cd8f17a38660509732b2

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

<<<<<<< HEAD
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
=======
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => { setStudenti(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const corsiUnici = [...new Set(studenti.map(s => s.corso))]

  const studentiFiltrati = studenti.filter(s =>
    s.nome.toLowerCase().includes(filtro.toLowerCase())
  )

  async function aggiungiStudente() {
    if (!nuovoNome || !nuovaEta || !nuovoCorso) {
      alert('Compila tutti i campi!')
      return
    }
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nuovoNome, eta: Number(nuovaEta), corso: nuovoCorso }),
    })
    const nuovo = await res.json()
    setStudenti([...studenti, nuovo])
    setNuovoNome('')
    setNuovaEta('')
    setNuovoCorso('')
  }

  async function eliminaStudente(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setStudenti(studenti.filter(s => s.id !== id))
  }

  const etaMedia = studenti.length > 0
    ? Math.round(studenti.reduce((a, s) => a + s.eta, 0) / studenti.length)
    : 0

  return (
    <div className="root">
      <div className="blob1" />
      <div className="blob2" />
      <div className="blob3" />
      <div className="container">

        <div className="header">
          <div className="header-eyebrow">sistema gestionale</div>
          <h1 className="header-title">Lista <span>Studenti</span></h1>
          <div className="header-stats">
            <div className="stat">
              <div className="stat-num">{studenti.length}</div>
              <div className="stat-label">totale</div>
            </div>
            <div className="stat">
              <div className="stat-num">{corsiUnici.length}</div>
              <div className="stat-label">corsi</div>
            </div>
            <div className="stat">
              <div className="stat-num">{etaMedia}</div>
              <div className="stat-label">età media</div>
            </div>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-label">_ nuovo studente</div>
          <div className="form-row">
            <div className="field">
              <input value={nuovoNome} onChange={e => setNuovoNome(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="field">
              <input value={nuovaEta} onChange={e => setNuovaEta(e.target.value)} placeholder="Età" type="number" />
            </div>
          </div>
          <div className="field">
            <input value={nuovoCorso} onChange={e => setNuovoCorso(e.target.value)} placeholder="Corso (es. Informatica, Design...)" />
          </div>
          <button className="btn-add" onClick={aggiungiStudente}>+ Aggiungi studente</button>
        </div>

        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Cerca studente per nome..." />
        </div>

        <div className="list-header">
          <span className="list-label">studenti</span>
          <span className="list-count">{studentiFiltrati.length} risultati</span>
        </div>

        {loading && <div className="loading">// caricamento in corso...</div>}

        {!loading && studentiFiltrati.map((s, i) => (
          <StudenteCard
            key={s.id}
            index={i}
            nome={s.nome}
            eta={s.eta}
            corso={s.corso}
            onElimina={() => eliminaStudente(s.id)}
          />
        ))}

        {!loading && studentiFiltrati.length === 0 && (
          <div className="empty">// nessun risultato trovato</div>
        )}

      </div>
    </div>
  )
}
>>>>>>> 7868332434187a8c0874cd8f17a38660509732b2
