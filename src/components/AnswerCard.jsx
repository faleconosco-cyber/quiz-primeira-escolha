// Uma alternativa.
//
// Botão de verdade, não div com onClick: ganha teclado, foco e leitura de tela
// de graça. O estado vai em aria-pressed, então quem usa leitor de tela sabe o
// que está marcado.
//
// A letra da alternativa não aparece: ela sugeriria uma ordem de "certo" e a
// pontuação sobe de A para D neste quiz.

export default function AnswerCard({ option, marcada, apagada, travada, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={marcada}
      disabled={travada}
      onClick={() => onSelect(option.id)}
      className={`alternativa${apagada ? ' apagada' : ''}`}
    >
      {option.text}
    </button>
  )
}
