import { useEffect, useRef, useState } from 'react'
import { processamento } from '../data/questions'

const POR_FRASE = 850
const PAUSA_FINAL = 700

// Espera curta entre a última pergunta e o resultado. Existe para dar peso ao
// que vem: resultado que aparece no mesmo instante do clique parece tabela
// pronta, não leitura das respostas. O cálculo em si é instantâneo.
export default function ProcessingScreen({ onDone }) {
  const [i, setI] = useState(0)
  const [pronto, setPronto] = useState(false)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const timers = []

    processamento.frases.forEach((_, idx) => {
      if (idx > 0) timers.push(setTimeout(() => setI(idx), POR_FRASE * idx))
    })

    const fim = POR_FRASE * processamento.frases.length
    timers.push(setTimeout(() => setPronto(true), fim))
    timers.push(setTimeout(() => done.current(), fim + PAUSA_FINAL))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="palco entra" style={{ justifyContent: 'center', textAlign: 'center', padding: '48px 0' }}>
      <div className="centro">
        <div
          aria-hidden="true"
          style={{
            width: 40, height: 40, margin: '0 auto 26px',
            borderRadius: '50%',
            border: '3px solid var(--linha)',
            borderTopColor: 'var(--verde)',
            animation: 'girar 1.1s linear infinite',
          }}
        />
        <style>{'@keyframes girar { to { transform: rotate(360deg) } }'}</style>

        {/* aria-live para quem usa leitor de tela acompanhar sem ver a animação */}
        <p
          aria-live="polite"
          className="serif"
          style={{
            fontSize: 'clamp(1.15rem, 4.6vw, 1.35rem)',
            fontWeight: 600,
            color: pronto ? 'var(--verde)' : 'var(--tinta-media)',
            minHeight: '3.2em',
            transition: 'color 300ms ease',
          }}
        >
          {pronto ? processamento.fim : processamento.frases[i]}
        </p>
      </div>
    </div>
  )
}
