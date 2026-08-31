// Conferência da pontuação. Roda com `npm test` e também no CI, antes de
// publicar. Se falhar, o deploy para.
//
// Força bruta: percorre todas as combinações possíveis de resposta e verifica
// que a faixa dos níveis cobre a escala inteira, sem buraco e sem sobreposição.

import { questions } from './src/data/questions.js'
import { results } from './src/data/results.js'
import { calculateQuizResult, calculateScore, PONTUACAO_MINIMA, PONTUACAO_MAXIMA } from './src/lib/scoring.js'

const NIVEIS = ['level1', 'level2', 'level3', 'level4']

let falhas = 0
function conferir(condicao, mensagem) {
  if (!condicao) { console.error('  FALHOU:', mensagem); falhas++ }
}

// ─── As faixas cobrem a escala sem buraco e sem sobreposição ────────────────

console.log('faixas')
console.log('  escala possível:', PONTUACAO_MINIMA, 'a', PONTUACAO_MAXIMA)
conferir(results.level1.min === PONTUACAO_MINIMA, 'o nível 1 não começa na pontuação mínima')
conferir(results.level4.max === PONTUACAO_MAXIMA, 'o nível 4 não termina na pontuação máxima')

for (let i = 1; i < NIVEIS.length; i++) {
  const anterior = results[NIVEIS[i - 1]]
  const atual = results[NIVEIS[i]]
  conferir(atual.min === anterior.max + 1,
    `existe buraco ou sobreposição entre ${NIVEIS[i - 1]} e ${NIVEIS[i]}`)
}
NIVEIS.forEach((n) => console.log(`  ${n}: ${results[n].min} a ${results[n].max} · ${results[n].nome}`))

// ─── Toda pontuação da escala cai num nível, e no nível certo ───────────────

for (let p = PONTUACAO_MINIMA; p <= PONTUACAO_MAXIMA; p++) {
  const nivel = NIVEIS.find((n) => p >= results[n].min && p <= results[n].max)
  conferir(!!nivel, `a pontuação ${p} não cai em nível nenhum`)
}

// ─── Força bruta sobre todas as combinações ─────────────────────────────────

const porNivel = {}
let combos = 0
let semNivel = 0
let foraDaFaixa = 0

function anda(i, acc) {
  if (i === questions.length) {
    combos++
    const score = calculateScore(acc)
    const nivel = calculateQuizResult(acc)
    if (!results[nivel]) { semNivel++; return }
    if (score < results[nivel].min || score > results[nivel].max) foraDaFaixa++
    porNivel[nivel] = (porNivel[nivel] || 0) + 1
    return
  }
  for (const o of questions[i].options) anda(i + 1, { ...acc, [questions[i].id]: o.id })
}
anda(0, {})

console.log('\nforça bruta')
console.log('  combinações testadas:', combos)
console.log('  sem nível:           ', semNivel)
console.log('  fora da própria faixa:', foraDaFaixa)
conferir(combos === Math.pow(4, questions.length), 'o número de combinações não bate')
conferir(semNivel === 0, 'alguma combinação não caiu em nível nenhum')
conferir(foraDaFaixa === 0, 'alguma combinação caiu num nível fora da faixa dela')

console.log('\ndistribuição')
NIVEIS.forEach((n) => {
  const q = porNivel[n] || 0
  console.log(`  ${String(results[n].numero)}  ${String(q).padStart(5)}  ${(q / combos * 100).toFixed(1).padStart(5)}%  ${results[n].nome}`)
})

// Nenhum nível pode ficar inalcançável.
NIVEIS.forEach((n) => conferir((porNivel[n] || 0) > 0, `o ${n} é inalcançável`))

// ─── Extremos ───────────────────────────────────────────────────────────────

const tudo = (letra) => Object.fromEntries(questions.map((q) => [q.id, letra]))
console.log('\nextremos')
const min = calculateQuizResult(tudo('A'))
const max = calculateQuizResult(tudo('D'))
console.log('  tudo A:', calculateScore(tudo('A')), '->', results[min].nome)
console.log('  tudo D:', calculateScore(tudo('D')), '->', results[max].nome)
conferir(min === 'level1', 'responder tudo A deveria cair no nível 1')
conferir(max === 'level4', 'responder tudo D deveria cair no nível 4')

// ─── Conteúdo ───────────────────────────────────────────────────────────────

console.log('\nconteúdo')
NIVEIS.forEach((n) => {
  const r = results[n]
  conferir(!!r.nome && !!r.headline && !!r.destaque && !!r.cta, `${n} está com campo vazio`)
  conferir(r.secoes.length > 0, `${n} está sem seção de próximo passo`)
  const t = textoTamanho(r)
  console.log(`  ${n}: ${t} chars no texto que vai pro e-mail`)
})

function textoTamanho(r) {
  // Reimplementado aqui de propósito, para o teste não depender da mesma função
  // que ele confere.
  let n = r.headline.length
  const somar = (blocos) => blocos.forEach((b) => {
    if (b.tipo === 'p') n += b.texto.length
    else if (b.tipo === 'trocas') b.itens.forEach((t) => { n += t.de.length + t.para.length })
    else b.itens.forEach((i) => { n += String(i).length })
  })
  somar(r.corpo)
  r.secoes.forEach((s) => somar(s.corpo))
  return n
}

if (falhas) { console.error(`\n${falhas} falha(s)`); process.exit(1) }
console.log('\nok')
