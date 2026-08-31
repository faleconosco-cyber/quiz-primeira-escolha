// Indicador dominante do progresso.
//
// A trilha de pontos é o motivo visual do quiz: caminho, etapas, possibilidades.
// O contador "4 de 6" existe, mas discreto, como a spec pede.

export default function ProgressBar({ atual, total, rotulo }) {
  const pct = atual >= total ? 100 : Math.floor((atual / total) * 100)

  return (
    <div style={{ padding: '18px 0 6px' }}>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso do quiz: ${pct}%`}
        style={{
          position: 'relative',
          height: 6,
          borderRadius: 100,
          background: 'var(--linha)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 100,
          background: 'linear-gradient(90deg, var(--verde) 0%, var(--verde-claro) 100%)',
          transition: 'width 420ms cubic-bezier(0.2, 0.7, 0.3, 1)',
        }} />
      </div>

      {/* Os pontos da trilha. Aria-hidden porque a barra acima já anuncia o
          progresso; repetir seria ruído no leitor de tela. */}
      <div aria-hidden="true" style={{
        display: 'flex', justifyContent: 'space-between',
        margin: '10px 2px 0',
      }}>
        {Array.from({ length: total }, (_, i) => {
          const feito = i < atual
          return (
            <span key={i} style={{
              width: feito ? 7 : 5,
              height: feito ? 7 : 5,
              borderRadius: '50%',
              background: feito ? 'var(--verde)' : 'var(--linha)',
              transition: 'all 300ms ease',
            }} />
          )
        })}
      </div>

      {rotulo && (
        <p style={{
          marginTop: 10, fontSize: 11, fontWeight: 600,
          color: 'var(--tinta-fraca)', letterSpacing: '0.04em',
        }}>
          {rotulo}
        </p>
      )}
    </div>
  )
}
