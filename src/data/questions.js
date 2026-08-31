// As seis perguntas.
//
// A pontuação é linear e sobe de A para D: 1, 2, 3, 4. Diferente do quiz dos
// pais, aqui não estamos procurando um tipo, e sim observando uma progressão de
// elaboração. Por isso a ordem das alternativas é sempre a mesma, da menos
// elaborada para a mais elaborada.
//
// A pessoa nunca vê que A vale menos que D.

export const CAPTURA_APOS = 3

export const questions = [
  {
    id: 1,
    title: 'Quando você pensa em uma profissão que combinaria com você, o que vem primeiro à sua cabeça?',
    options: [
      { id: 'A', text: 'Sinceramente? Ainda não sei muito bem o que deveria considerar.', value: 1 },
      { id: 'B', text: 'Penso principalmente nas matérias e assuntos de que gosto.', value: 2 },
      { id: 'C', text: 'Penso no que gosto, no que faço bem e em algumas características que gostaria que meu trabalho tivesse.', value: 3 },
      { id: 'D', text: 'Penso em uma combinação entre meus interesses, habilidades, valores, rotina desejada e possibilidades para o futuro.', value: 4 },
    ],
  },
  {
    id: 2,
    title: 'Imagine duas profissões que oferecem salários parecidos. O que ajudaria você a escolher entre elas?',
    options: [
      { id: 'A', text: 'Eu provavelmente ficaria meio perdido(a) sobre como comparar.', value: 1 },
      { id: 'B', text: 'Escolheria aquela que parece mais interessante ou que tem mais a ver comigo.', value: 2 },
      { id: 'C', text: 'Tentaria comparar as atividades, o ambiente e a rotina de cada uma.', value: 3 },
      { id: 'D', text: 'Compararia vários critérios importantes para mim: atividades, rotina, ambiente, possibilidades de crescimento, estilo de vida e o que cada caminho exigiria de mim.', value: 4 },
    ],
  },
  {
    id: 3,
    title: 'Se alguém perguntasse "como você gostaria que fosse um dia comum no seu futuro trabalho?", você conseguiria responder?',
    options: [
      { id: 'A', text: 'Não. Nunca pensei muito nisso.', value: 1 },
      { id: 'B', text: 'Consigo imaginar algumas coisas, mas de forma bem geral.', value: 2 },
      { id: 'C', text: 'Sim. Já consigo dizer algumas características que gostaria que minha rotina tivesse.', value: 3 },
      { id: 'D', text: 'Sim. Consigo falar sobre ambiente, tipo de atividade, contato com pessoas, autonomia, ritmo e outras características importantes para mim.', value: 4 },
    ],
  },
  {
    id: 4,
    title: 'Quando você se interessa por uma profissão, quanto costuma investigar sobre a realidade dela?',
    options: [
      { id: 'A', text: 'Quase nada. Geralmente fico com a ideia que já tenho sobre ela.', value: 1 },
      { id: 'B', text: 'Procuro algumas informações, vídeos ou conteúdos nas redes sociais.', value: 2 },
      { id: 'C', text: 'Tento entender formação, áreas de atuação, rotina e mercado.', value: 3 },
      { id: 'D', text: 'Além de pesquisar, gosto de comparar fontes, conhecer trajetórias diferentes e descobrir como aquela profissão pode ser vivida na prática.', value: 4 },
    ],
  },
  {
    // A pergunta que carrega a tese do quiz: uma formação não é um trilho único.
    // A alternativa D é a única que considera que outro curso poderia levar ao
    // mesmo tipo de trabalho.
    id: 5,
    title: 'Imagine que você goste muito de uma profissão, mas descubra que a faculdade tem várias matérias que não esperava. O que faria?',
    options: [
      { id: 'A', text: 'Provavelmente ficaria bastante frustrado(a) e começaria a duvidar da escolha.', value: 1 },
      { id: 'B', text: 'Tentaria seguir mesmo assim, porque o mais importante seria chegar à profissão que quero.', value: 2 },
      { id: 'C', text: 'Pesquisaria melhor para entender a formação e descobrir se aquele curso ainda faz sentido para mim.', value: 3 },
      { id: 'D', text: 'Além de investigar o curso, compararia outras formações e caminhos que também poderiam me aproximar do tipo de trabalho que quero realizar.', value: 4 },
    ],
  },
  {
    id: 6,
    title: 'Qual dessas frases mais combina com a forma como você pensa seu futuro profissional hoje?',
    options: [
      { id: 'A', text: '"Primeiro preciso descobrir qual é a profissão certa para mim."', value: 1 },
      { id: 'B', text: '"Tenho algumas profissões em mente e preciso descobrir qual delas combina mais comigo."', value: 2 },
      { id: 'C', text: '"Quero entender melhor o que busco e comparar diferentes possibilidades."', value: 3 },
      { id: 'D', text: '"Quero construir um caminho que faça sentido para mim, sabendo que posso combinar interesses, descobrir possibilidades e até mudar de direção ao longo da vida."', value: 4 },
    ],
  },
]

export const landing = {
  titulo: 'Sei o que espero de uma futura profissão?',
  paragrafos: [
    'Talvez você já tenha algumas profissões em mente.',
    'Talvez ainda não faça ideia.',
    'Mas existe uma pergunta que vem antes de escolher:',
  ],
  destaque: 'Você sabe o que uma profissão precisa ter para fazer sentido para você?',
  fecho: 'Responda 6 perguntas rápidas e descubra o quanto você já conhece seus critérios para uma futura profissão.',
  botao: 'Descobrir meu resultado',
  microtexto: 'Leva cerca de 2 minutos.',
}

export const captura = {
  titulo: 'Já apareceram algumas pistas sobre o que você busca.',
  texto: 'Agora faltam apenas 3 perguntas para descobrir seu resultado. Preencha seus dados para continuar:',
  consentimento: 'Concordo em receber meu resultado e conteúdos relacionados à escolha profissional.',
  botao: 'Continuar',
  microtexto: 'Seus dados serão usados para enviar informações relacionadas ao seu resultado. Você poderá sair da lista quando quiser.',
}

export const processamento = {
  frases: [
    'Organizando suas respostas...',
    'Identificando os critérios que já aparecem nas suas escolhas...',
    'Observando o quanto você já explorou suas possibilidades...',
  ],
  fim: 'Seu resultado está pronto.',
}

export const AVISO =
  'Este quiz é uma ferramenta de reflexão e não determina qual profissão você deve escolher. O resultado indica aspectos que podem ser aprofundados no seu processo de escolha profissional.'
