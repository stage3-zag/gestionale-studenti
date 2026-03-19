import { useParams, useNavigate } from 'react-router-dom'

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

function media(arr) {
  if (!arr || arr.length === 0) return null
  return (arr.reduce((a, v) => a + v, 0) / arr.length).toFixed(1)
}

function mediaTotale(voti) {
  const tutti = Object.values(voti || {}).flat()
  if (tutti.length === 0) return null
  return (tutti.reduce((a, v) => a + v, 0) / tutti.length).toFixed(1)
}

export default function DettaglioStudente({ studenti, dark }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const studente = studenti.find(s => s.id === Number(id))

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

  const cfg    = getCfg(studente.corso)
  const voti   = studente.voti || {}
  const materie = Object.keys(voti)
  const mt     = mediaTotale(voti)

  return (
    <div>
      {/* Torna indietro */}
      <button onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'8px', background:'none', border:'none', color:T.muted, fontFamily:'JetBrains Mono,monospace', fontSize:'12px', cursor:'pointer', marginBottom:'32px', padding:0, letterSpacing:'0.06em' }}>
        ← lista studenti
      </button>

      {/* Card principale */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'24px', padding:'28px', marginBottom:'12px' }}>
        <div style={{ width:'72px', height:'72px', borderRadius:'18px', background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', fontWeight:'800', marginBottom:'18px' }}>
          {studente.nome.charAt(0).toUpperCase()}
        </div>
        <h1 style={{ fontSize:'24px', fontWeight:'800', color:T.text, letterSpacing:'-0.02em', marginBottom:'10px' }}>
          {studente.nome}
        </h1>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 12px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', fontFamily:'JetBrains Mono,monospace', background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}` }}>
            {cfg.icon} {studente.corso}
          </span>
          {studente.classe && (
            <span style={{ display:'inline-flex', alignItems:'center', padding:'4px 12px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', fontFamily:'JetBrains Mono,monospace', background:T.sub, color:T.muted, border:`1px solid ${T.border}` }}>
              Classe {studente.classe}
            </span>
          )}
        </div>
      </div>

      {/* Stats rapide */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'16px' }}>
        {[
          { label:'età',        val:`${studente.eta} anni` },
          { label:'classe',     val:studente.classe || '—' },
          { label:'media tot.', val: mt ? mt : '—' },
        ].map(({ label, val }) => (
          <div key={label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'16px', textAlign:'center' }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'6px' }}>{label}</div>
            <div style={{ fontSize:'18px', fontWeight:'700', color: label === 'media tot.' ? colorVoto(Number(mt)) : T.text }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Voti per materia */}
      {materie.length > 0 && (
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:'20px', padding:'22px' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:T.muted, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'18px' }}>_ voti per materia</div>

          {materie.map(materia => {
            const lista = voti[materia]
            const med   = media(lista)
            const colMedia = colorVoto(Number(med))

            return (
              <div key={materia} style={{ marginBottom:'18px', background:T.sub, border:`1px solid ${T.border}`, borderRadius:'14px', padding:'16px' }}>

                {/* Intestazione materia */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                  <span style={{ fontSize:'14px', fontWeight:'700', color:T.text }}>{materia}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:T.muted, letterSpacing:'0.08em' }}>media</span>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'16px', fontWeight:'800', color:colMedia }}>{med}</span>
                  </div>
                </div>

                {/* Lista voti */}
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'12px' }}>
                  {lista.map((v, i) => (
                    <div key={i} style={{ width:'36px', height:'36px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono,monospace', fontSize:'14px', fontWeight:'700', color:colorVoto(v), background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border:`1px solid ${T.border}` }}>
                      {v}
                    </div>
                  ))}
                </div>

                {/* Barra media */}
                <div style={{ height:'5px', background:T.border, borderRadius:'3px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${Number(med) * 10}%`, background:colMedia, borderRadius:'3px', transition:'width 0.5s ease' }} />
                </div>

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
