import { useEffect, useRef, useState } from 'react'

import { questions, CAPTURA_APOS } from './data/questions'
import { results, textoDoResultado } from './data/results'
import { calculateQuizResult, calculateScore, respostasDetalhadas } from './lib/scoring'
import { submitLead } from './lib/leadService'
import { track } from './lib/analytics'
import { salvarEstado, lerEstado, limparEstado, capturarUtms, origemDaPagina } from './lib/storage'
import { config } from './config'

import QuizLanding from './components/QuizLanding'
import QuestionScreen from './components/QuestionScreen'
import LeadCapture from './components/LeadCapture'
import ProcessingScreen from './components/ProcessingScreen'
import ResultScreen from './components/ResultScreen'

// landing → perguntas 1-3 → captura → perguntas 4-6 → processando → resultado
const INICIAL = { screen: 'landing', indice: 0, answers: {}, lead: null, enviado: false }

export default function App() {
  const salvo = useRef(lerEstado()).current
  const [estado, setEstado] = useState(salvo || INICIAL)
  const utms = useRef(null)
  if (utms.current === null) utms.current = capturarUtms()

  const { screen, indice, answers, lead } = estado

  useEffect(() => { track('quiz_viewed') }, [])
  useEffect(() => { salvarEstado(estado) }, [estado])

  function comecar() {
    track('quiz_started')
    setEstado((e) => ({ ...e, screen: 'questions', indice: 0 }))
  }

  function responder(optionId) {
    const q = questions[indice]
    const novas = { ...answers, [q.id]: optionId }

    track(`question_${q.id}_answered`, { question_id: q.id, option_id: optionId })

    // Captura no meio do caminho: quem já respondeu três perguntas investiu o
    // bastante para não abandonar, e ainda falta resultado para receber.
    if (indice + 1 === CAPTURA_APOS && !lead) {
      track('lead_form_viewed')
      setEstado((e) => ({ ...e, answers: novas, screen: 'capture' }))
      return
    }

    if (indice + 1 < questions.length) {
      setEstado((e) => ({ ...e, answers: novas, indice: indice + 1 }))
    } else {
      setEstado((e) => ({ ...e, answers: novas, screen: 'processing' }))
    }
  }

  // A pontuação é sempre refeita a partir das respostas guardadas, então voltar
  // e trocar uma alternativa não deixa ponto antigo pendurado.
  function voltar() {
    if (indice === 0) return
    setEstado((e) => ({ ...e, indice: indice - 1 }))
  }

  function capturar(dados) {
    track('lead_submitted')
    setEstado((e) => ({ ...e, lead: dados, indice: CAPTURA_APOS, screen: 'questions' }))
  }

  function finalizar() {
    const nivel = calculateQuizResult(answers)
    const r = results[nivel]

    track('quiz_completed', { content_name: nivel })
    track(`result_${nivel}`)

    // Envio único. A trava evita disparar de novo se a pessoa der refresh na
    // tela de resultado.
    if (!estado.enviado) {
      const agora = new Date()
      submitLead({
        ...(lead || {}),
        status: 'completo',
        perfil: nivel,
        nivel: r.numero,
        pontuacao: calculateScore(answers),
        respostas: respostasDetalhadas(answers),
        resultadoTitulo: r.nome,
        resultadoTexto: textoDoResultado(r),
        ...utms.current,
        origem: origemDaPagina(),
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR'),
        dataHora: agora.toISOString(),
      })
    }

    setEstado((e) => ({ ...e, screen: 'result', enviado: true }))
  }

  function reiniciar() {
    limparEstado()
    setEstado(INICIAL)
  }

  function abrirWhatsApp(r) {
    track('whatsapp_clicked', { content_name: r.id })
    const msg = `Olá! Fiz o quiz "Sei o que espero de uma futura profissão?" e meu resultado foi "${r.nome}". Quero entender melhor como a Orientação Profissional pode me ajudar a explorar meus próximos caminhos.`
    window.open(
      `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  if (screen === 'landing') return <QuizLanding onStart={comecar} />

  if (screen === 'capture') return <LeadCapture onSubmit={capturar} />

  if (screen === 'processing') return <ProcessingScreen onDone={finalizar} />

  if (screen === 'result') {
    const r = results[calculateQuizResult(answers)]
    return (
      <ResultScreen
        resultado={r}
        lead={lead}
        onRestart={reiniciar}
        onWhatsApp={() => abrirWhatsApp(r)}
      />
    )
  }

  return (
    <QuestionScreen
      key={questions[indice].id}
      question={questions[indice]}
      indice={indice}
      total={questions.length}
      respostaAtual={answers[questions[indice].id]}
      onAnswer={responder}
      onBack={indice > 0 ? voltar : null}
    />
  )
}
