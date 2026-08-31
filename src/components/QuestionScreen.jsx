import { useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import AnswerCard from './AnswerCard'

const ESPERA = 300 // ms entre marcar e avançar

export default function QuestionScreen({ question, indice, total, respostaAtual, onAnswer, onBack }) {
  const [marcada, setMarcada] = useState(respostaAtual || null)
  const [travada, setTravada] = useState(false)
  const timer = useRef(null)
  const titulo = useRef(null)

  useEffect(() => {
    setMarcada(respostaAtual || null)
    setTravada(false)
    // Leva o foco pro enunciado a cada pergunta: sem isso, quem navega por
    // teclado ou leitor de tela continua preso no fim da tela anterior.
    if (titulo.current) titulo.current.focus()
    return () => clearTimeout(timer.current)
  }, [question.id, respostaAtual])

  function selecionar(optionId) {
    if (travada) return
    setMarcada(optionId)
    setTravada(true)
    timer.current = setTimeout(() => onAnswer(optionId), ESPERA)
  }

  return (
    <div className="palco">
      <div className="centro">
        <ProgressBar atual={indice + 1} total={total} rotulo={`Pergunta ${indice + 1} de ${total}`} />
      </div>

      <div className="centro entra" key={question.id} style={{ flex: 1, paddingTop: 14, paddingBottom: 40 }}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar para a pergunta anterior"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--tinta-fraca)', fontSize: 13, fontWeight: 600,
              padding: '8px 8px 8px 0', marginBottom: 6,
            }}
          >
            <span aria-hidden="true">←</span> Voltar
          </button>
        )}

        <h1
          ref={titulo}
          tabIndex={-1}
          style={{
            fontSize: 'clamp(1.35rem, 5.6vw, 1.7rem)',
            marginBottom: 26,
            outline: 'none',
          }}
        >
          {question.title}
        </h1>

        <div
          className="escalona"
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {question.options.map((o) => (
            <AnswerCard
              key={o.id}
              option={o}
              marcada={marcada === o.id}
              apagada={marcada !== null && marcada !== o.id}
              travada={travada}
              onSelect={selecionar}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
