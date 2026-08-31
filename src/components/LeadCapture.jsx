import { useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import { captura, questions, CAPTURA_APOS } from '../data/questions'
import { config } from '../config'

function mascaraWhatsapp(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const valida = {
  nome: (v) => v.trim().length > 1,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  whatsapp: (v) => [10, 11].includes(v.replace(/\D/g, '').length),
}

const erroDe = {
  nome: 'Escreva seu nome.',
  email: 'Confira o e-mail, parece faltar alguma coisa.',
  whatsapp: 'O WhatsApp precisa do DDD e do número completo.',
}

// Fora do componente de propósito. Declarado dentro, o React trataria cada
// render como um tipo novo, desmontaria o input e o foco pularia fora a cada
// letra digitada.
function Campo({ id, label, tipo, placeholder, inputMode, autoComplete, valor, erro, onChange, onBlur }) {
  return (
    <div>
      <label className="rotulo-campo" htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={tipo}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="campo"
        placeholder={placeholder}
        value={valor}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={() => onBlur(id)}
        aria-invalid={erro ? 'true' : 'false'}
        aria-describedby={erro ? `${id}-erro` : undefined}
      />
      {erro && (
        <p id={`${id}-erro`} role="alert" style={{
          fontSize: 12.5, color: 'var(--coral)', fontWeight: 600, marginTop: 6,
        }}>
          {erro}
        </p>
      )}
    </div>
  )
}

export default function LeadCapture({ onSubmit }) {
  const [campos, setCampos] = useState({ nome: '', email: '', whatsapp: '' })
  const [tocado, setTocado] = useState({})
  const [consentimento, setConsentimento] = useState(false)
  const [tentou, setTentou] = useState(false)
  const titulo = useRef(null)

  useEffect(() => { if (titulo.current) titulo.current.focus() }, [])

  const camposOk = Object.keys(valida).every((k) => valida[k](campos[k]))
  const podeEnviar = camposOk && consentimento

  // O erro só aparece depois que a pessoa saiu do campo ou tentou enviar.
  // Acusar erro enquanto ela ainda está digitando a primeira letra do e-mail
  // é hostil.
  const erro = (k) => ((tocado[k] || tentou) && !valida[k](campos[k]) ? erroDe[k] : null)

  function alterar(k, v) {
    setCampos((c) => ({ ...c, [k]: k === 'whatsapp' ? mascaraWhatsapp(v) : v }))
  }

  function marcarTocado(k) {
    setTocado((t) => ({ ...t, [k]: true }))
  }

  function enviar(e) {
    e.preventDefault()
    setTentou(true)
    if (!podeEnviar) return
    onSubmit({
      nome: campos.nome.trim(),
      email: campos.email.trim(),
      whatsapp: campos.whatsapp.trim(),
      consentimento: true,
    })
  }

  return (
    <div className="palco">
      <div className="centro">
        {/* A barra fica parada nos 50% da pergunta 3: a captura não é etapa do
            quiz e não pode dar a sensação de que atrasou o progresso. */}
        <ProgressBar atual={CAPTURA_APOS} total={questions.length} />
      </div>

      <div className="centro entra" style={{ flex: 1, paddingTop: 16, paddingBottom: 44 }}>
        <h1 ref={titulo} tabIndex={-1} style={{
          fontSize: 'clamp(1.3rem, 5.4vw, 1.65rem)', marginBottom: 12, outline: 'none',
        }}>
          {captura.titulo}
        </h1>

        <p className="leitura" style={{ color: 'var(--tinta-media)', marginBottom: 26 }}>
          {captura.texto}
        </p>

        <form onSubmit={enviar} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Campo id="nome" label="Nome" tipo="text" placeholder="Como você se chama"
                 autoComplete="name" valor={campos.nome} erro={erro('nome')}
                 onChange={alterar} onBlur={marcarTocado} />
          <Campo id="email" label="E-mail" tipo="email" placeholder="voce@email.com"
                 autoComplete="email" inputMode="email" valor={campos.email} erro={erro('email')}
                 onChange={alterar} onBlur={marcarTocado} />
          <Campo id="whatsapp" label="WhatsApp" tipo="tel" placeholder="(21) 99999-9999"
                 autoComplete="tel" inputMode="numeric" valor={campos.whatsapp} erro={erro('whatsapp')}
                 onChange={alterar} onBlur={marcarTocado} />

          <label style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            cursor: 'pointer', marginTop: 2,
          }}>
            <input
              type="checkbox"
              checked={consentimento}
              onChange={(e) => setConsentimento(e.target.checked)}
              style={{ width: 20, height: 20, marginTop: 2, accentColor: 'var(--verde)', flexShrink: 0 }}
            />
            <span style={{ fontSize: 13.5, color: 'var(--tinta-media)', lineHeight: 1.5 }}>
              {captura.consentimento}
              {config.privacyPolicyUrl && (
                <>
                  {' '}
                  <a href={config.privacyPolicyUrl} target="_blank" rel="noopener noreferrer"
                     style={{ color: 'var(--verde)', fontWeight: 700 }}>
                    Política de Privacidade
                  </a>
                </>
              )}
            </span>
          </label>

          {tentou && !consentimento && (
            <p role="alert" style={{ fontSize: 12.5, color: 'var(--coral)', fontWeight: 600, marginTop: -6 }}>
              Marque a caixa acima para continuar.
            </p>
          )}

          <button type="submit" className="botao" disabled={!podeEnviar} style={{ marginTop: 6 }}>
            {captura.botao}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p style={{ fontSize: 12, color: 'var(--tinta-fraca)', marginTop: 16, lineHeight: 1.55 }}>
          {captura.microtexto}
        </p>
      </div>
    </div>
  )
}
