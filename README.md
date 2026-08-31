# Quiz: Sei o que espero de uma futura profissão?

Porta 2.1 da bio (`links.institutorumo.com`). Fala direto com o adolescente, sem
intermediário, e encaminha para o processo de Primeira Escolha.

Seis perguntas, captura de lead depois da terceira, quatro níveis de clareza. A
pessoa nunca vê pontuação nem sabe que a alternativa de baixo vale mais.

## O que ele não é

Não é teste vocacional. Não indica profissão, não recomenda curso, não diz que
alguém "tem perfil para X". O eixo é um só: **quanto eu já sei sobre o que
espero de uma futura profissão?**

O nível 4 não encerra a conversa. Ele abre exploração, com a ideia de que uma
formação não é destino único: duas pessoas do mesmo curso constroem carreiras
diferentes, e pessoas de formações diferentes chegam a trabalhos parecidos.

## Configuração

Tudo que muda sem mexer em lógica está em `src/config.js`: nome da marca, número
do WhatsApp, endpoint do lead, política de privacidade e Instagram. O número do
WhatsApp não aparece em nenhum outro arquivo.

O `leadEndpoint` já aponta para o Apps Script "Leads dos quizzes da bio", que
grava na planilha, manda pro Brevo e abre o cartão no CRM. O mesmo endpoint
atende os quatro quizzes: quem separa os funis é o `QUIZ_SLUG`.

Sem endpoint configurado o quiz não quebra: funciona inteiro e avisa no console
durante o desenvolvimento.

## Como rodar

```bash
npm install
npm run dev
```

`npm test` roda a conferência da pontuação: as 4.096 combinações possíveis, mais
a checagem de que as faixas dos níveis cobrem a escala de 6 a 24 sem buraco e
sem sobreposição, e de que nenhum nível é inalcançável. Roda também no CI, antes
de publicar, e trava o deploy se falhar.

## Estrutura

```
src/
  config.js              marca, WhatsApp, endpoint, slug
  data/questions.js      as 6 perguntas, os pesos e os textos de tela
  data/results.js        os 4 níveis e o bloco final
  lib/scoring.js         função pura de pontuação e nível
  lib/leadService.js     submitLead, o único ponto de saída
  lib/storage.js         persistência contra refresh e UTMs
  lib/analytics.js       eventos
  components/            uma tela ou peça por arquivo
  App.jsx                a máquina de estados
```

## Pontuação

Linear: a alternativa de cima vale 1 e a de baixo vale 4. Seis perguntas, de 6 a
24 pontos.

| pontos | nível |
|---|---|
| 6 a 10 | 1 · Começando a descobrir |
| 11 a 15 | 2 · Algumas pistas, poucos critérios |
| 16 a 20 | 3 · Bons critérios, mapa em expansão |
| 21 a 24 | 4 · Clareza para explorar |

A pontuação é **sempre recalculada do zero** a partir das respostas guardadas,
nunca acumulada. É isso que faz o botão "voltar" funcionar sem bug: trocar uma
alternativa não precisa subtrair ponto, porque nada foi somado antes.

Distribuição sobre as 4.096 combinações: nível 1 com 5%, nível 2 com 52%, nível
3 com 41% e nível 4 com 2%.

## Decisões técnicas

**Sem framer-motion e sem biblioteca de ícones.** O quiz dos pais carrega 287 KB
por causa delas. Aqui as transições são CSS e as poucas setas são texto, então o
pacote fica em 169 KB, 41% menor. O tráfego vem do Instagram, no celular.

**Envio por POST, não GET com o payload na URL.** O texto de um resultado passa
de mil caracteres, e o Apps Script chamado por GET morre calado acima de uns
12 KB: ninguém recebe erro, o lead simplesmente não chega.

**A máscara é brasileira**, como a especificação pede, e aceita 10 ou 11
dígitos. Diferente do quiz dos pais, que tem seletor de país por causa das
famílias expatriadas. Se aparecer adolescente de fora, é aqui que mexe.

**Acessibilidade:** as alternativas são `button` de verdade, com `aria-pressed`,
então teclado e leitor de tela funcionam sem gambiarra. O foco vai para o
enunciado a cada pergunta. Os erros do formulário têm `role="alert"` e
`aria-describedby`. A tela de processamento tem `aria-live`. Animações respeitam
`prefers-reduced-motion`.

## Visual

Irmão do quiz dos pais: mesma paleta do Rumo, mesmas fontes, Playfair nos
títulos e Montserrat no texto. O que muda é o clima. Lá o fundo é creme cheio e
o bordô conduz, porque o assunto é preocupação. Aqui o fundo é claro, tem mais
ar e o verde conduz, porque o assunto é descoberta. O creme aparece como
respiro, não como base.
