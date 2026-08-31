import { landing } from '../data/questions'
import { config } from '../config'

export default function QuizLanding({ onStart }) {
  return (
    <div className="palco entra" style={{ justifyContent: 'center', padding: '48px 0' }}>
      <div className="centro">

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--fundo-alt)', borderRadius: 100,
          padding: '7px 16px 7px 8px', marginBottom: 30,
        }}>
          <img
            src={`${import.meta.env.BASE_URL}logo-rumo.png`}
            alt=""
            width="20" height="20"
            style={{ height: 18, width: 'auto' }}
          />
          <span className="rotulo" style={{ color: 'var(--bordo)' }}>{config.brandName}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 8.5vw, 2.8rem)', marginBottom: 24 }}>
          {landing.titulo}
        </h1>

        <div className="leitura" style={{ color: 'var(--tinta-media)', fontSize: 16 }}>
          {landing.paragrafos.map((p, i) => (
            <p key={i} style={{ marginBottom: 8 }}>{p}</p>
          ))}
        </div>

        {/* A pergunta que o quiz coloca antes da escolha. É o coração da tela,
            então ganha tratamento tipográfico próprio. */}
        <p className="serif leitura" style={{
          fontSize: 'clamp(1.2rem, 5vw, 1.45rem)',
          fontWeight: 600, fontStyle: 'italic',
          lineHeight: 1.4, color: 'var(--verde)',
          borderLeft: '3px solid var(--coral)',
          paddingLeft: 18, margin: '22px 0',
        }}>
          {landing.destaque}
        </p>

        <p className="leitura" style={{ color: 'var(--tinta-media)', fontSize: 16, marginBottom: 34 }}>
          {landing.fecho}
        </p>

        <button type="button" className="botao" onClick={onStart}>
          {landing.botao}
          <span aria-hidden="true">→</span>
        </button>

        <p style={{
          textAlign: 'center', fontSize: 12, color: 'var(--tinta-fraca)',
          marginTop: 14,
        }}>
          {landing.microtexto}
        </p>
      </div>
    </div>
  )
}
