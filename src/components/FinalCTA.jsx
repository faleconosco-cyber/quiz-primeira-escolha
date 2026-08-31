import { blocoFinal } from '../data/results'

// Bloco que fecha todos os níveis, igual. A ideia central do quiz mora aqui:
// escolher é construir um caminho, e o caminho nasce de um encontro entre três
// coisas. Por isso o encontro é desenhado, não só descrito.
export default function FinalCTA({ onWhatsApp }) {
  return (
    <section className="cartao" style={{ padding: '30px 24px' }}>
      <h2 style={{ fontSize: 'clamp(1.3rem, 5.2vw, 1.6rem)', marginBottom: 16 }}>
        {blocoFinal.titulo}
      </h2>

      <p className="leitura" style={{
        fontSize: 15.5, color: 'var(--tinta-media)', lineHeight: 1.72, marginBottom: 20,
      }}>
        {blocoFinal.abertura}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {blocoFinal.encontro.map((e, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              background: 'var(--fundo-alt)', borderRadius: 12,
              padding: '14px 18px', textAlign: 'center',
            }}>
              <span className="serif" style={{
                fontSize: 15.5, fontWeight: 700, color: 'var(--verde)',
              }}>
                {e}
              </span>
            </div>
            {i < blocoFinal.encontro.length - 1 && (
              <span aria-hidden="true" style={{
                textAlign: 'center', color: 'var(--coral)',
                fontSize: 18, lineHeight: 1,
              }}>
                +
              </span>
            )}
          </div>
        ))}
      </div>

      {blocoFinal.fechamento.map((p, i) => (
        <p key={i} className="leitura" style={{
          fontSize: 15.5, color: 'var(--tinta-media)', lineHeight: 1.72, marginBottom: 14,
        }}>
          {p}
        </p>
      ))}

      <button type="button" className="botao botao-whats" onClick={onWhatsApp} style={{ marginTop: 12 }}>
        {blocoFinal.cta}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}
