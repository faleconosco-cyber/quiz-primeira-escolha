// Monta os blocos tipados de um resultado.
//
// Fica separado da tela para qualquer nível ser desenhado sem a tela saber qual
// é, e para acrescentar um tipo de bloco novo sem mexer no resto.

function Paragrafo({ children }) {
  return (
    <p className="leitura" style={{
      fontSize: 15.5, color: 'var(--tinta-media)',
      lineHeight: 1.72, marginBottom: 14,
    }}>
      {children}
    </p>
  )
}

// Perguntas e frases que o adolescente diria. Ganham voz própria, em itálico,
// para não se confundirem com o texto que fala com ele.
function Falas({ itens }) {
  return (
    <div style={{
      borderLeft: '2px solid var(--creme)',
      paddingLeft: 16, margin: '0 0 18px',
    }}>
      {itens.map((f, i) => (
        <p key={i} className="serif" style={{
          fontSize: 15.5, fontStyle: 'italic', fontWeight: 600,
          color: 'var(--verde)', lineHeight: 1.5, marginBottom: 7,
        }}>
          &ldquo;{f}&rdquo;
        </p>
      ))}
    </div>
  )
}

function Lista({ itens }) {
  return (
    <ul style={{ listStyle: 'none', margin: '0 0 18px', maxWidth: 'var(--leitura)' }}>
      {itens.map((it, i) => (
        <li key={i} style={{
          position: 'relative', paddingLeft: 20, marginBottom: 8,
          fontSize: 15, color: 'var(--tinta-media)', lineHeight: 1.6,
        }}>
          <span aria-hidden="true" style={{
            position: 'absolute', left: 2, top: 10,
            width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)',
          }} />
          {it}
        </li>
      ))}
    </ul>
  )
}

// "Em vez de X, perguntar Y". A troca é o conteúdo, então ela é desenhada como
// troca, não como duas frases soltas.
function Trocas({ itens }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
      {itens.map((t, i) => (
        <div key={i} className="cartao-creme" style={{ borderRadius: 12, padding: '16px 18px' }}>
          <p style={{ fontSize: 12, color: 'var(--tinta-fraca)', marginBottom: 4 }}>
            Em vez de
          </p>
          <p style={{
            fontSize: 14.5, color: 'var(--tinta-fraca)',
            textDecoration: 'line-through', marginBottom: 12, lineHeight: 1.45,
          }}>
            {t.de}
          </p>
          <p style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 700, marginBottom: 4 }}>
            Perguntar
          </p>
          <p className="serif" style={{
            fontSize: 15.5, fontWeight: 600, color: 'var(--verde)', lineHeight: 1.45,
          }}>
            {t.para}
          </p>
        </div>
      ))}
    </div>
  )
}

// O trilho "faculdade → profissão → mesmo caminho para sempre", desenhado como
// trilho justamente porque o texto ao redor diz que ele limita.
function Trilho({ itens }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexWrap: 'wrap',
      gap: 8, margin: '0 0 18px',
    }}>
      {itens.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            background: 'var(--fundo-alt)', color: 'var(--tinta-media)',
            borderRadius: 100, padding: '7px 14px',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            {it}
          </span>
          {i < itens.length - 1 && (
            <span aria-hidden="true" style={{ color: 'var(--tinta-fraca)' }}>→</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default function ResultContent({ blocos }) {
  return blocos.map((b, i) => {
    if (b.tipo === 'p') return <Paragrafo key={i}>{b.texto}</Paragrafo>
    if (b.tipo === 'falas') return <Falas key={i} itens={b.itens} />
    if (b.tipo === 'trocas') return <Trocas key={i} itens={b.itens} />
    if (b.tipo === 'trilho') return <Trilho key={i} itens={b.itens} />
    return <Lista key={i} itens={b.itens} />
  })
}
