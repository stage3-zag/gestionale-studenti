import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const corsoConfig = {
  Informatica: { color: '#5EEAD4', bg: 'rgba(94,234,212,0.12)', border: 'rgba(94,234,212,0.2)', icon: '⟨/⟩', chart: '#5EEAD4' },
  Design:      { color: '#C084FC', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.2)', icon: '◈', chart: '#C084FC' },
  Marketing:   { color: '#FCA5A5', bg: 'rgba(252,165,165,0.12)', border: 'rgba(252,165,165,0.2)', icon: '◎', chart: '#FCA5A5' },
}
const chartColors = ['#5EEAD4','#C084FC','#FCA5A5','#93C5FD','#FCD34D','#86EFAC']

function getCfg(corso) { return corsoConfig[corso] || { color:'#93C5FD', bg:'rgba(147,197,253,0.12)', border:'rgba(147,197,253,0.2)', icon:'◆', chart:'#93C5FD' } }

function Avatar({ nome, corso }) {
  const cfg = getCfg(corso)
  return (
    <div style={{ width:'44px',height:'44px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'17px',fontWeight:'800',flexShrink:0,background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}` }}>
      {nome.charAt(0).toUpperCase()}
    </div>
  )
}

function Badge({ corso }) {
  const cfg = getCfg(corso)
  return (
    <span style={{ display:'inline-flex',alignItems:'center',gap:'5px',padding:'3px 9px',borderRadius:'6px',fontSize:'11px',fontWeight:'600',letterSpacing:'0.03em',fontFamily:'JetBrains Mono,monospace',background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}` }}>
      <span style={{fontSize:'9px'}}>{cfg.icon}</span>{corso}
    </span>
  )
}

function GraficoTorta({ studenti, dark }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2, r = Math.min(W, H) / 2 - 20
    const conteggi = {}
    studenti.forEach(s => { conteggi[s.corso] = (conteggi[s.corso] || 0) + 1 })
    const corsi = Object.keys(conteggi)
    const totale = studenti.length
    if (totale === 0) return
    ctx.clearRect(0, 0, W, H)
    let angolo = -Math.PI / 2
    corsi.forEach((corso, i) => {
      const fetta = (conteggi[corso] / totale) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, angolo, angolo + fetta)
      ctx.closePath()
      ctx.fillStyle = corsoConfig[corso]?.chart || chartColors[i % chartColors.length]
      ctx.fill()
      ctx.strokeStyle = dark ? '#1C1F2E' : '#F0F4FF'
      ctx.lineWidth = 3
      ctx.stroke()
      angolo += fetta
    })
    ctx.beginPath()
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2)
    ctx.fillStyle = dark ? '#252839' : '#FFFFFF'
    ctx.fill()
    ctx.fillStyle = dark ? '#EEF0FF' : '#1C1F2E'
    ctx.font = '800 22px Plus Jakarta Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(totale, cx, cy - 8)
    ctx.font = '400 11px JetBrains Mono, monospace'
    ctx.fillStyle = dark ? '#4B5070' : '#8890B0'
    ctx.fillText('studenti', cx, cy + 12)
  }, [studenti, dark])
  return <canvas ref={canvasRef} width={180} height={180} />
}

function esportaCSV(studenti) {
  const csv = ['ID,Nome,Età,Corso', ...studenti.map(s => `${s.id},${s.nome},${s.eta},${s.corso}`)].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type:'text/csv' }))
  a.download = 'studenti.csv'
  a.click()
}

export default function ListaStudenti({ studenti, setStudenti, dark, toggleDark }) {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('')
  const [corsoFiltro, setCorsoFiltro] = useState('Tutti')
  const [ordinamento, setOrdinamento] = useState('nome')
  const [direzione, setDirezione] = useState('asc')
  const [nuovoNome, setNuovoNome] = useState('')
  const [nuovaEta, setNuovaEta] = useState('')
  const [nuovoCorso, setNuovoCorso] = useState('')
  const [mostraStats, setMostraStats] = useState(false)

  const corsiUnici = [...new Set(studenti.map(s => s.corso))]

  const studentiFiltrati = studenti
    .filter(s => {
      const matchNome = s.nome.toLowerCase().includes(filtro.toLowerCase())
      const matchCorso = corsoFiltro === 'Tutti' || s.corso === corsoFiltro
      return matchNome && matchCorso
    })
    .sort((a, b) => {
      let vA = a[ordinamento], vB = b[ordinamento]
      if (typeof vA === 'string') { vA = vA.toLowerCase(); vB = vB.toLowerCase() }
      if (vA < vB) return direzione === 'asc' ? -1 : 1
      if (vA > vB) return direzione === 'asc' ? 1 : -1
      return 0
    })

  function cambiaOrdinamento(campo) {
    if (ordinamento === campo) setDirezione(d => d === 'asc' ? 'desc' : 'asc')
    else { setOrdinamento(campo); setDirezione('asc') }
  }

  function aggiungiStudente() {
    if (!nuovoNome || !nuovaEta || !nuovoCorso) { alert('Compila tutti i campi!'); return }
    setStudenti([...studenti, { id: Date.now(), nome: nuovoNome, eta: Number(nuovaEta), corso: nuovoCorso }])
    setNuovoNome(''); setNuovaEta(''); setNuovoCorso('')
  }

  function eliminaStudente(id) { setStudenti(studenti.filter(s => s.id !== id)) }

  const etaMedia = studenti.length > 0 ? Math.round(studenti.reduce((a, s) => a + s.eta, 0) / studenti.length) : 0

  const T = {
    card: dark ? '#252839' : '#FFFFFF',
    border: dark ? '#2E3248' : '#E2E8F0',
    text: dark ? '#EEF0FF' : '#1C1F2E',
    muted: dark ? '#4B5070' : '#8890B0',
    input: dark ? '#1C1F2E' : '#F8FAFF',
  }

  const inputStyle = { width:'100%', padding:'11px 14px', background:T.input, border:`1px solid ${T.border}`, borderRadius:'10px', color:T.text, fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:'14px', outline:'none' }
  const freccia = campo => ordinamento === campo ? (direzione === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:'36px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', letterSpacing:'0.18em', color:'#5EEAD4', textTransform:'uppercase', opacity:0.9 }}>
            sistema gestionale
          </div>
          <button onClick={toggleDark} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'10px', padding:'8px 14px', cursor:'pointer', color:T.muted, fontFamily:'JetBrains Mono,monospace', fontSize:'12px', display:'flex', alignItems:'center', gap:'6px' }}>
            {dark ? '☀ chiaro' : '☾ scuro'}
          </button>
        </div>
        <h1 style={{ fontSize:'36px', fontWeight:'800', color:T.text, letterSpacing:'-0.03em', marginBottom:'18px' }}>
          Lista <span style={{ background:'linear-gradient(135deg, #5EEAD4, #93C5FD)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Studenti</span>
        </h1>
        <div style={{ display:'flex', gap:'10px' }}>
          {[{ num:studenti.length, label:'totale' }, { num:corsiUnici.length, label:'corsi' }, { num:etaMedia, label:'età media' }].map(({ num, label }) => (
            <div key={label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'10px', padding:'10px 16px', textAlign:'center', minWidth:'80px' }}>
              <div style={{ fontSize:'20px', fontWeight:'700', color:T.text, lineHeight:1, marginBottom:'3px' }}>{num}</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted, letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiche */}
      <button onClick={() => setMostraStats(v => !v)} style={{ width:'100%', background:T.card, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'14px 18px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase' }}>_ statistiche corsi</span>
        <span style={{ color:T.muted, fontSize:'13px' }}>{mostraStats ? '▲' : '▼'}</span>
      </button>

      {mostraStats && (
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'16px', padding:'24px', marginBottom:'16px', display:'flex', gap:'24px', alignItems:'center', flexWrap:'wrap' }}>
          <GraficoTorta studenti={studenti} dark={dark} />
          <div style={{ flex:1, minWidth:'160px' }}>
            {corsiUnici.map((corso, i) => {
              const count = studenti.filter(s => s.corso === corso).length
              const perc = Math.round((count / studenti.length) * 100)
              const colore = corsoConfig[corso]?.chart || chartColors[i % chartColors.length]
              return (
                <div key={corso} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
                    <span style={{ fontSize:'13px', fontWeight:'600', color:T.text }}>{corso}</span>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'12px', color:T.muted }}>{count} ({perc}%)</span>
                  </div>
                  <div style={{ height:'6px', background:T.border, borderRadius:'3px', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${perc}%`, background:colore, borderRadius:'3px', transition:'width 0.5s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Form */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'20px', padding:'22px', marginBottom:'20px' }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'14px' }}>_ nuovo studente</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 90px', gap:'8px', marginBottom:'8px' }}>
          <input value={nuovoNome} onChange={e => setNuovoNome(e.target.value)} placeholder="Nome completo" style={inputStyle} />
          <input value={nuovaEta} onChange={e => setNuovaEta(e.target.value)} placeholder="Età" type="number" style={inputStyle} />
        </div>
        <input value={nuovoCorso} onChange={e => setNuovoCorso(e.target.value)} placeholder="Corso (es. Informatica, Design...)" style={{ ...inputStyle, marginBottom:'8px' }} />
        <button onClick={aggiungiStudente} style={{ width:'100%', padding:'12px', background:'linear-gradient(135deg, #5EEAD4, #3BCFBA)', color:'#1C1F2E', border:'none', borderRadius:'10px', fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:'14px', fontWeight:'700', cursor:'pointer', marginTop:'4px' }}>
          + Aggiungi studente
        </button>
      </div>

      {/* Ricerca */}
      <div style={{ position:'relative', marginBottom:'10px' }}>
        <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:T.muted, fontSize:'15px' }}>⌕</span>
        <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Cerca studente per nome..." style={{ ...inputStyle, background:T.card, border:`1px solid ${T.border}`, borderRadius:'12px', paddingLeft:'42px' }} />
      </div>

      {/* Filtri corso */}
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'10px' }}>
        {['Tutti', ...corsiUnici].map(c => (
          <button key={c} onClick={() => setCorsoFiltro(c)} style={{ padding:'6px 14px', borderRadius:'20px', cursor:'pointer', border: corsoFiltro === c ? '1px solid rgba(94,234,212,0.3)' : `1px solid ${T.border}`, background: corsoFiltro === c ? 'rgba(94,234,212,0.12)' : 'transparent', color: corsoFiltro === c ? '#5EEAD4' : T.muted, fontFamily:'JetBrains Mono,monospace', fontSize:'11px' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Ordinamento */}
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'6px', alignItems:'center' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted }}>ordina:</span>
        {['nome','eta','corso'].map(campo => (
          <button key={campo} onClick={() => cambiaOrdinamento(campo)} style={{ padding:'5px 12px', borderRadius:'8px', cursor:'pointer', border: ordinamento === campo ? '1px solid rgba(147,197,253,0.35)' : `1px solid ${T.border}`, background: ordinamento === campo ? 'rgba(147,197,253,0.1)' : 'transparent', color: ordinamento === campo ? '#93C5FD' : T.muted, fontFamily:'JetBrains Mono,monospace', fontSize:'11px' }}>
            {campo}{freccia(campo)}
          </button>
        ))}
      </div>

      {/* Header lista */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 4px 10px' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase' }}>studenti</span>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted }}>{studentiFiltrati.length} risultati</span>
          <button onClick={() => esportaCSV(studentiFiltrati)} style={{ padding:'5px 12px', borderRadius:'8px', cursor:'pointer', border:'1px solid rgba(94,234,212,0.3)', background:'rgba(94,234,212,0.08)', color:'#5EEAD4', fontFamily:'JetBrains Mono,monospace', fontSize:'11px' }}>
            ↓ CSV
          </button>
        </div>
      </div>

      {/* Lista */}
      {studentiFiltrati.map((s, i) => (
        <div key={s.id} onClick={() => navigate(`/studente/${s.id}`)}
          style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'16px', padding:'14px 16px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', transition:'border-color 0.25s, transform 0.2s, box-shadow 0.25s', animation:'fadeUp 0.35s ease both', animationDelay:`${i * 0.07}s` }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'; e.currentTarget.style.borderColor=dark?'#3D4260':'#C8D4F0' }}
          onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor=T.border }}
        >
          <Avatar nome={s.nome} corso={s.corso} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'15px', fontWeight:'700', color:T.text, marginBottom:'5px' }}>{s.nome}</div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'12px', color:T.muted }}>{s.eta} anni</span>
              <span style={{ color:T.border }}>·</span>
              <Badge corso={s.corso} />
            </div>
          </div>
          <div style={{ display:'flex', gap:'6px' }}>
            <button onClick={e => { e.stopPropagation(); navigate(`/studente/${s.id}`) }} style={{ background:'none', border:`1px solid ${T.border}`, color:T.muted, width:'32px', height:'32px', borderRadius:'8px', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>
            <button onClick={e => { e.stopPropagation(); eliminaStudente(s.id) }} style={{ background:'none', border:`1px solid ${T.border}`, color:T.muted, width:'32px', height:'32px', borderRadius:'8px', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
          </div>
        </div>
      ))}

      {studentiFiltrati.length === 0 && (
        <div style={{ textAlign:'center', padding:'56px 0', color:T.muted, fontFamily:'JetBrains Mono,monospace', fontSize:'13px' }}>
          // nessun risultato trovato
        </div>
      )}
    </div>
  )
}
