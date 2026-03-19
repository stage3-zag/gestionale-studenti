import { useParams, useNavigate } from 'react-router-dom'

const corsoConfig = {
  Informatica: { color: '#5EEAD4', bg: 'rgba(94,234,212,0.12)', border: 'rgba(94,234,212,0.2)', icon: '⟨/⟩' },
  Design:      { color: '#C084FC', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.2)', icon: '◈' },
  Marketing:   { color: '#FCA5A5', bg: 'rgba(252,165,165,0.12)', border: 'rgba(252,165,165,0.2)', icon: '◎' },
}
const defaultCorso = { color: '#93C5FD', bg: 'rgba(147,197,253,0.12)', border: 'rgba(147,197,253,0.2)', icon: '◆' }

function getCfg(corso) {
  return corsoConfig[corso] || defaultCorso
}

export default function DettaglioStudente({ studenti }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const studente = studenti.find(s => s.id === Number(id))

  if (!studente) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#363A55', marginBottom: '20px' }}>// studente non trovato</div>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', background: 'rgba(94,234,212,0.12)', border: '1px solid rgba(94,234,212,0.3)', color: '#5EEAD4', borderRadius: '10px', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}>
          ← torna alla lista
        </button>
      </div>
    )
  }

  const cfg = getCfg(studente.corso)

  return (
    <div>
      {/* Bottone torna indietro */}
      <button onClick={() => navigate('/')} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'none', border: 'none', color: '#4B5070',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
        cursor: 'pointer', marginBottom: '32px', padding: 0,
        letterSpacing: '0.06em',
      }}>
        ← lista studenti
      </button>

      {/* Card principale */}
      <div style={{ background: '#252839', border: '1px solid #2E3248', borderRadius: '24px', padding: '32px', marginBottom: '16px' }}>

        {/* Avatar grande */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '20px',
          background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', fontWeight: '800', marginBottom: '20px',
        }}>
          {studente.nome.charAt(0).toUpperCase()}
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#EEF0FF', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          {studente.nome}
        </h1>

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '8px', fontSize: '12px',
          fontWeight: '600', fontFamily: 'JetBrains Mono, monospace',
          background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
        }}>
          {cfg.icon} {studente.corso}
        </span>
      </div>

      {/* Dettagli */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#252839', border: '1px solid #2E3248', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4B5070', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>età</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#EEF0FF', lineHeight: 1 }}>{studente.eta}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4B5070', marginTop: '4px' }}>anni</div>
        </div>
        <div style={{ background: '#252839', border: '1px solid #2E3248', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4B5070', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>id studente</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#EEF0FF', lineHeight: 1 }}>#{studente.id}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4B5070', marginTop: '4px' }}>codice univoco</div>
        </div>
      </div>

      {/* Info corso */}
      <div style={{ background: '#252839', border: `1px solid ${cfg.border}`, borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4B5070', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>corso di studi</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: cfg.color }}>{studente.corso}</div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#4B5070', marginTop: '6px' }}>
          {studente.corso === 'Informatica' && 'Sviluppo software, algoritmi, sistemi'}
          {studente.corso === 'Design' && 'UI/UX, grafica, comunicazione visiva'}
          {studente.corso === 'Marketing' && 'Strategie digitali, analisi, brand'}
          {!['Informatica', 'Design', 'Marketing'].includes(studente.corso) && 'Percorso di studi in corso'}
        </div>
      </div>
    </div>
  )
}
