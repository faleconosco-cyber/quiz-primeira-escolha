// Eventos do quiz.
//
// Um lugar só para disparar, para nenhum componente precisar saber se hoje
// existe GA4, Meta Pixel, os dois ou nenhum. Se a ferramenta não estiver na
// página, a chamada simplesmente não faz nada.
//
// Nenhum evento leva dado pessoal: as perguntas mandam só o id da pergunta e da
// alternativa.

const PIXEL_PADRAO = {
  lead_submitted: 'Lead',
  quiz_completed: 'CompleteRegistration',
}

export function track(evento, params = {}) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', evento, params)
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: evento, ...params })
  } catch (e) {
    // Medição nunca pode derrubar o quiz.
  }

  try {
    if (typeof window.fbq === 'function') {
      const padrao = PIXEL_PADRAO[evento]
      if (padrao) window.fbq('track', padrao, params)
      else window.fbq('trackCustom', evento, params)
    }
  } catch (e) {
    // Idem.
  }
}
