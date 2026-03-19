import { useState, useEffect } from 'react'

const API = 'http://localhost:8080/studenti'

const corsoConfig = {
  Informatica: { color: '#5EEAD4', bg: 'rgba(94,234,212,0.12)', border: 'rgba(94,234,212,0.2)', icon: '⟨/⟩' },
  Design:      { color: '#C084FC', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.2)', icon: '◈' },
  Marketing:   { color: '#FCA5A5', bg: 'rgba(252,165,165,0.12)', border: 'rgba(252,165,165,0.2)', icon: '◎' },
}
const defaultCorso = { color: '#93C5FD', bg: 'rgba(147,197,253,0.12)', border: 'rgba(147,197,253,0.2)', icon: '◆' }

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
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
  const [studenti, setStudenti] = useState([])
  const [filtro, setFiltro] = useState('')
  const [nuovoNome, setNuovoNome] = useState('')
  const [nuovaEta, setNuovaEta] = useState('')
  const [nuovoCorso, setNuovoCorso] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

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