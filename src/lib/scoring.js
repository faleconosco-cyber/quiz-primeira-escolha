// Pontuação e nível.
//
// Função pura, sem contador incremental. A soma é sempre refeita a partir das
// respostas guardadas, e é isso que faz o botão "voltar" funcionar sem bug:
// trocar uma alternativa não precisa subtrair pontuação antiga, porque nada foi
// acumulado em lugar nenhum.

import { questions } from '../data/questions'
import { results } from '../data/results'

// answers: { [questionId]: optionId }
export function calculateScore(answers) {
  return questions.reduce((soma, q) => {
    const escolhida = q.options.find((o) => o.id === answers[q.id])
    return soma + (escolhida ? escolhida.value : 0)
  }, 0)
}

export function calculateQuizResult(answers) {
  const score = calculateScore(answers)
  if (score <= results.level1.max) return 'level1'
  if (score <= results.level2.max) return 'level2'
  if (score <= results.level3.max) return 'level3'
  return 'level4'
}

// Detalhe de cada resposta, para viajar no payload junto do lead.
export function respostasDetalhadas(answers) {
  return questions.map((q) => {
    const escolhida = q.options.find((o) => o.id === answers[q.id])
    return { pergunta: q.id, alternativa: answers[q.id] || null, valor: escolhida ? escolhida.value : null }
  })
}

export const PONTUACAO_MINIMA = questions.length * 1
export const PONTUACAO_MAXIMA = questions.length * 4
