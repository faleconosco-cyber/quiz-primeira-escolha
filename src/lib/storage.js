// Persistência contra refresh e captura de UTM.
//
// Um refresh acidental no meio do quiz não pode mandar a pessoa pro começo, e
// um parâmetro de campanha não pode se perder no primeiro clique.

const CHAVE_ESTADO = 'rumo.quiz.primeira-escolha.estado'
const CHAVE_UTM = 'rumo.quiz.primeira-escolha.utm'

const CAMPOS_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export function salvarEstado(estado) {
  try {
    localStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado))
  } catch (e) {
    // Navegador com armazenamento bloqueado: o quiz funciona, só não sobrevive
    // a um refresh.
  }
}

export function lerEstado() {
  try {
    const bruto = localStorage.getItem(CHAVE_ESTADO)
    if (!bruto) return null
    const e = JSON.parse(bruto)
    if (!e || typeof e !== 'object') return null

    // A tela de processamento é passageira. Quem der refresh nela volta pra
    // última pergunta, senão fica preso numa animação que já terminou.
    if (e.screen === 'processing') e.screen = 'questions'
    return e
  } catch (err) {
    return null
  }
}

export function limparEstado() {
  try {
    localStorage.removeItem(CHAVE_ESTADO)
  } catch (e) {
    // Nada a fazer.
  }
}

export function capturarUtms() {
  let guardadas = {}
  try {
    guardadas = JSON.parse(localStorage.getItem(CHAVE_UTM) || '{}')
  } catch (e) {
    guardadas = {}
  }

  const daUrl = {}
  try {
    const params = new URLSearchParams(window.location.search)
    CAMPOS_UTM.forEach((c) => {
      const v = params.get(c)
      if (v) daUrl[c] = v
    })
  } catch (e) {
    // URL sem query: segue com o que já estava guardado.
  }

  // A visita nova só sobrescreve se realmente trouxe UTM. Assim um refresh sem
  // parâmetro não apaga a origem de quem chegou pelo anúncio.
  const utms = Object.keys(daUrl).length ? daUrl : guardadas

  try {
    localStorage.setItem(CHAVE_UTM, JSON.stringify(utms))
  } catch (e) {
    // Sem armazenamento o quiz continua, só perde a origem.
  }

  return utms
}

export function origemDaPagina() {
  try {
    return document.referrer || ''
  } catch (e) {
    return ''
  }
}
