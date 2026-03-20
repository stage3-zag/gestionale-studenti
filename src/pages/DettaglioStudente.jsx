import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const MATERIE = ['Matematica', 'Italiano', 'Informatica', 'Inglese', 'Fisica', 'Storia']

const corsoConfig = {
  Informatica: { color:'#5EEAD4', bg:'rgba(94,234,212,0.12)', border:'rgba(94,234,212,0.2)', icon:'⟨/⟩' },
  Design:      { color:'#C084FC', bg:'rgba(192,132,252,0.12)', border:'rgba(192,132,252,0.2)', icon:'◈' },
  Marketing:   { color:'#FCA5A5', bg:'rgba(252,165,165,0.12)', border:'rgba(252,165,165,0.2)', icon:'◎' },
}

function getCfg(corso) {
  return corsoConfig[corso] || { color:'#93C5FD', bg:'rgba(147,197,253,0.12)', border:'rgba(147,197,253,0.2)', icon:'◆' }
}

function colorVoto(v) {
  if (v >= 9) return '#5EEAD4'
  if (v >= 7) return '#93C5FD'
  if (v >= 6) return '#FCD34D'
  return '#FCA5A5'
}

function calcolaEta(dataNascita) {
  if (!dataNascita) return '—'
  const oggi = new Date()
  const nascita = new Date(dataNascita)
  let eta = oggi.getFullYear() - nascita.getFullYear()
  const mese = oggi.getMonth() - nascita.getMonth()
  if (mese < 0 || (mese === 0 && oggi.getDate() < nascita.getDate())) eta--
  return eta
}

function parseVoti(str) {
  if (!str) return []
  return str.split(',').map(v => Number(v.trim())).filter(v => !isNaN(v))
}

function media(arr) {
  if (!arr || arr.length === 0) return null
  return (arr.reduce((a, v) => a + v, 0) / arr.length).toFixed(1)
}

function mediaTotale(voti) {
  const tutti = Object.values(voti || {}).flatMap(v => parseVoti(v))
  if (tutti.length === 0) return null
  return (tutti.reduce((a, v) => a + v, 0) / tutti.length).toFixed(1)
}

export default function DettaglioStudente({ studenti, setStudenti, dark }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const studente = studenti.find(s => s.id === Number(id))

  const [editClasse, setEditClasse] = useState(false)
  const [classeTemp, setClasseTemp] = useState('')
  const [nuovoVoto, setNuovoVoto] = useState({})
  const [saving, setSaving] = useState(false)

  const T = {
    card:   dark ? '#252839' : '#FFFFFF',
    border: dark ? '#2E3248' : '#E2E8F0',
    text:   dark ? '#EEF0FF' : '#1C1F2E',
    muted:  dark ? '#4B5070' : '#8890B0',
    sub:    dark ? '#1C1F2E' : '#F8FAFF',
  }

  if (!studente) {
    return (
      <div style={{ textAlign:'center', padding:'80px 0' }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'13px', color:T.muted, marginBottom:'20px' }}>// studente non trovato</div>
        <button onClick={() => navigate('/')} style={{ padding:'10px 20px', background:'rgba(94,234,212,0.12)', border:'1px solid rgba(94,234,212,0.3)', color:'#5EEAD4', borderRadius:'10px', cursor:'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:'13px' }}>
          ← torna alla lista
        </button>
      </div>
    )
  }

  const voti = studente.voti || {}
  const mt = mediaTotale(voti)

  async function salvaStudente(aggiornato) {
    setSaving(true)
    const res = await fetch(`http://localhost:8080/studenti/${studente.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aggiornato),
    })
    const saved = await res.json()
    setStudenti(prev => prev.map(s => s.id === saved.id ? saved : s))
    setSaving(false)
    return saved
  }

  async function salvaClasse() {
    await salvaStudente({ ...studente, classe: classeTemp })
    setEditClasse(false)
  }

  async function aggiungiVoto(materia) {
    const valore = Number(nuovoVoto[materia])
    if (!valore || valore < 1 || valore > 10) { alert('Inserisci un voto tra 1 e 10'); return }
    const votiAttuali = parseVoti(voti[materia] || '')
    const nuoviVoti = [...votiAttuali, valore].join(',')
    await salvaStudente({ ...studente, voti: { ...voti, [materia]: nuoviVoti } })
    setNuovoVoto(prev => ({ ...prev, [materia]: '' }))
  }

  async function rimuoviVoto(materia, index) {
    const lista = parseVoti(voti[materia] || '')
    lista.splice(index, 1)
    await salvaStudente({ ...studente, voti: { ...voti, [materia]: lista.join(',') } })
  }

  const inputStyle = { padding:'8px 12px', background:T.sub, border:`1px solid ${T.border}`, borderRadius:'8px', color:T.text, fontFamily:'JetBrains Mono,monospace', fontSize:'13px', outline:'none', width:'70px' }

  return (
    <div>
      {/* Torna indietro */}
      <button onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'8px', background:'none', border:'none', color:T.muted, fontFamily:'JetBrains Mono,monospace', fontSize:'12px', cursor:'pointer', marginBottom:'32px', padding:0, letterSpacing:'0.06em' }}>
        ← lista studenti
      </button>

      {/* Card principale */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'24px', padding:'28px', marginBottom:'12px' }}>
        <div style={{ width:'72px', height:'72px', borderRadius:'18px', background:'rgba(147,197,253,0.12)', color:'#93C5FD', border:'1px solid rgba(147,197,253,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', fontWeight:'800', marginBottom:'18px' }}>
          {studente.nome.charAt(0).toUpperCase()}
        </div>
        <h1 style={{ fontSize:'24px', fontWeight:'800', color:T.text, letterSpacing:'-0.02em', marginBottom:'14px' }}>
          {studente.nome} {studente.cognome}
        </h1>
      </div>

      {/* Stats rapide */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'16px' }}>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'16px', textAlign:'center' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'6px' }}>età</div>
          <div style={{ fontSize:'18px', fontWeight:'700', color:T.text }}>{calcolaEta(studente.dataNascita)} anni</div>
        </div>

        {/* Classe modificabile */}
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'16px', textAlign:'center' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'6px' }}>classe</div>
          {editClasse ? (
            <div style={{ display:'flex', flexDirection:'column', gap:'6px', alignItems:'center' }}>
              <input value={classeTemp} onChange={e => setClasseTemp(e.target.value)} placeholder="es. 3A" style={{ ...inputStyle, width:'80px', textAlign:'center' }} />
              <div style={{ display:'flex', gap:'4px' }}>
                <button onClick={salvaClasse} style={{ padding:'4px 10px', background:'rgba(94,234,212,0.12)', border:'1px solid rgba(94,234,212,0.3)', color:'#5EEAD4', borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontFamily:'JetBrains Mono,monospace' }}>✓</button>
                <button onClick={() => setEditClasse(false)} style={{ padding:'4px 10px', background:'transparent', border:`1px solid ${T.border}`, color:T.muted, borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontFamily:'JetBrains Mono,monospace' }}>✕</button>
              </div>
            </div>
          ) : (
            <div onClick={() => { setClasseTemp(studente.classe || ''); setEditClasse(true) }} style={{ fontSize:'18px', fontWeight:'700', color:T.text, cursor:'pointer' }} title="Clicca per modificare">
              {studente.classe || '—'}
            </div>
          )}
        </div>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'16px', textAlign:'center' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'6px' }}>media tot.</div>
          <div style={{ fontSize:'18px', fontWeight:'700', color: mt ? colorVoto(Number(mt)) : T.muted }}>{mt || '—'}</div>
        </div>
      </div>

      {/* Voti per materia */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'20px', padding:'22px' }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'18px' }}>_ voti per materia</div>

        {MATERIE.map(materia => {
          const lista = parseVoti(voti[materia] || '')
          const med = media(lista)
          const colMedia = med ? colorVoto(Number(med)) : T.muted

          return (
            <div key={materia} style={{ marginBottom:'16px', background:T.sub, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'16px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                <span style={{ fontSize:'14px', fontWeight:'700', color:T.text }}>{materia}</span>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted }}>media</span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'16px', fontWeight:'800', color:colMedia }}>{med || '—'}</span>
                </div>
              </div>

              {/* Lista voti */}
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'12px' }}>
                {lista.map((v, i) => (
                  <div key={i} onClick={() => rimuoviVoto(materia, i)} title="Clicca per rimuovere"
                    style={{ width:'36px', height:'36px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono,monospace', fontSize:'14px', fontWeight:'700', color:colorVoto(v), background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border:`1px solid ${T.border}`, cursor:'pointer' }}>
                    {v}
                  </div>
                ))}
                {lista.length === 0 && (
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'12px', color:T.muted }}>nessun voto</span>
                )}
              </div>

              {/* Barra media */}
              {med && (
                <div style={{ height:'5px', background:T.border, borderRadius:'3px', overflow:'hidden', marginBottom:'12px' }}>
                  <div style={{ height:'100%', width:`${Number(med) * 10}%`, background:colMedia, borderRadius:'3px', transition:'width 0.5s ease' }} />
                </div>
              )}

              {/* Aggiungi voto */}
              <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                <input
                  type="number" min="1" max="10"
                  value={nuovoVoto[materia] || ''}
                  onChange={e => setNuovoVoto(prev => ({ ...prev, [materia]: e.target.value }))}
                  placeholder="voto"
                  style={inputStyle}
                />
                <button onClick={() => aggiungiVoto(materia)} disabled={saving}
                  style={{ padding:'8px 14px', background:'rgba(94,234,212,0.12)', border:'1px solid rgba(94,234,212,0.3)', color:'#5EEAD4', borderRadius:'8px', cursor:'pointer', fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>
                  + aggiungi
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}