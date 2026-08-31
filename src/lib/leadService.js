// Único ponto de saída do lead.
//
// Componente nenhum deve chamar fetch por conta própria. Trocar o destino, ou
// acrescentar outro, é mexer só aqui.

import { config, QUIZ_SLUG } from '../config'

export function submitLead(data) {
  const payload = { quiz: QUIZ_SLUG, ...data }

  // Sem endpoint configurado o quiz não quebra: segue funcionando inteiro e
  // avisa no console durante o desenvolvimento.
  if (!config.leadEndpoint) {
    if (import.meta.env.DEV) {
      console.info('[lead] nenhum endpoint configurado em src/config.js. Payload que seria enviado:', payload)
    }
    return Promise.resolve(false)
  }

  // POST, não GET com o payload na URL. O texto de um resultado passa de mil
  // caracteres, e o Apps Script chamado por GET morre calado quando a URL passa
  // de uns 12 KB: ninguém recebe erro, o lead simplesmente não chega.
  // text/plain evita o preflight que o modo no-cors não sobreviveria.
  return fetch(config.leadEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
    .then(() => true)
    .catch(() => false)
}
