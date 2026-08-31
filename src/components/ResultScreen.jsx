import { useEffect, useRef } from 'react'
import ResultContent from './ResultContent'
import FinalCTA from './FinalCTA'
import { AVISO } from '../data/questions'
import { config } from '../config'

// A tela não despeja o texto todo de uma vez: hierarquia primeiro, cartões
// depois, frase destacada, CTA, e só então o bloco comum.
export default function ResultScreen({ resultado, lead, onRestart, onWhatsApp }) {
  const topo = useRef(null)
  const primeiroNome = lead?.nome?.trim().split(' ')[0]

  useEffect(() => {
    if (topo.current) topo.current.focus()
  }, [])

  return (
    <div className="palco entra" style={{ paddingBottom: 56 }}>
      <div className="centro" style={{ paddingTop: 40 }}>

        <div style={{ marginBottom: 26 }}>
          <span className="rotulo" style={{ color: 'var(--coral)' }}>
            Nível {resultado.numero} de 4
          </span>

          <h1
            ref={topo}
            tabIndex={-1}
            className="serif"
            style={{
              fontSize: 'clamp(2rem, 8vw, 2.6rem)',
              marginTop: 8, marginBottom: 14, outline: 'none',
              color: 'var(--verde)',
            }}
          >
            {resultado.nome}
          </h1>

          {primeiroNome && (
            <p style={{ fontSize: 13.5, color: 'var(--tinta-fraca)', marginBottom: 14 }}>
              {primeiroNome}, esse é o seu resultado.
            </p>
          )}

          <p className="leitura" style={{
            fontSize: 'clamp(1.05rem, 4.2vw, 1.2rem)',
            fontWeight: 600, lineHeight: 1.5, color: 'var(--tinta)',
          }}>
            {resultado.headline}
          </p>
        </div>

        <section className="cartao" style={{ marginBottom: 14 }}>
          <p className="rotulo" style={{ color: 'var(--tinta-fraca)', marginBottom: 14 }}>
            O que seu resultado mostra
          </p>
          <ResultContent blocos={resultado.corpo} />
        </section>

        {resultado.secoes.map((s, i) => (
          <section key={i} className="cartao" style={{ marginBottom: 14 }}>
            <h2 style={{
              fontSize: 'clamp(1.15rem, 4.6vw, 1.35rem)',
              marginBottom: 14, color: 'var(--bordo)',
            }}>
              {s.titulo}
            </h2>
            <ResultContent blocos={s.corpo} />
          </section>
        ))}

        {/* A frase que a pessoa leva embora. É o único bloco em verde cheio. */}
        <section style={{
          background: 'var(--verde)', borderRadius: 'var(--raio)',
          padding: '28px 24px', marginBottom: 14,
        }}>
          <p className="serif" style={{
            fontSize: 'clamp(1.15rem, 4.8vw, 1.4rem)',
            fontWeight: 600, lineHeight: 1.45, color: '#fff',
          }}>
            {resultado.destaque}
          </p>
        </section>

        {resultado.textoFinal && (
          <section className="cartao cartao-creme" style={{ marginBottom: 14 }}>
            <p className="leitura" style={{
              fontSize: 15.5, color: 'var(--tinta-media)', lineHeight: 1.72,
            }}>
              {resultado.textoFinal}
            </p>
          </section>
        )}

        <button
          type="button"
          className="botao botao-whats"
          onClick={onWhatsApp}
          style={{ marginBottom: 30 }}
        >
          {resultado.cta}
          <span aria-hidden="true">→</span>
        </button>

        <FinalCTA onWhatsApp={onWhatsApp} />

        <div style={{ marginTop: 26 }}>
          <button type="button" className="botao-fantasma" onClick={onRestart}>
            Refazer quiz
          </button>
        </div>

        <p style={{
          fontSize: 12, color: 'var(--tinta-fraca)',
          lineHeight: 1.6, marginTop: 26, maxWidth: 'var(--leitura)',
        }}>
          {AVISO}
        </p>

        <p style={{
          textAlign: 'center', fontSize: 11.5,
          color: 'var(--tinta-fraca)', marginTop: 22,
        }}>
          © {config.brandName} · Orientação Profissional
        </p>
      </div>
    </div>
  )
}
