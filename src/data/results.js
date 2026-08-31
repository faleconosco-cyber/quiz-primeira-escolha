// Os quatro níveis.
//
// A progressão é de elaboração, não de acerto:
//   1  preciso começar a olhar para mim
//   2  já tenho pistas e preciso transformá-las em critérios
//   3  já tenho critérios e preciso ampliar possibilidades
//   4  já tenho clareza e posso explorar trajetórias e combinações
//
// O nível 4 abre exploração em vez de encerrar a conversa. Nenhum nível diz
// qual profissão combina com a pessoa, nem que a escolha está resolvida.
//
// Os blocos seguem sempre a mesma forma para a tela montar qualquer nível sem
// saber qual é:
//   nome, headline, corpo, secoes[], destaque, cta

export const results = {
  level1: {
    id: 'level1',
    numero: 1,
    min: 6,
    max: 10,
    nome: 'Começando a descobrir',
    headline: 'Você ainda está começando a descobrir o que espera de uma futura profissão.',
    corpo: [
      { tipo: 'p', texto: 'E isso não significa que você esteja atrasado(a).' },
      {
        tipo: 'p',
        texto:
          'Provavelmente, a pergunta "qual profissão escolher?" apareceu antes de outras perguntas que podem ajudar muito mais neste momento. Por exemplo:',
      },
      {
        tipo: 'falas',
        itens: [
          'Do que eu gosto?',
          'O que faço bem?',
          'Que tipo de rotina combina comigo?',
          'O que é importante para mim em um trabalho?',
          'Como gostaria que o trabalho fizesse parte da vida que quero construir?',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Sem alguns desses critérios, olhar para uma lista enorme de cursos pode dar a sensação de que existe uma resposta escondida que você deveria encontrar.',
      },
      { tipo: 'p', texto: 'Talvez você não precise começar pela profissão. Talvez precise começar por você.' },
    ],
    secoes: [
      {
        titulo: 'Seu próximo passo',
        corpo: [
          {
            tipo: 'p',
            texto:
              'Antes de procurar uma resposta no mundo, vale construir um mapa mais claro sobre você.',
          },
          {
            tipo: 'p',
            texto:
              'Interesses, habilidades, valores, experiências, curiosidades e desejos podem começar a mostrar o que uma profissão precisa ter para fazer sentido.',
          },
        ],
      },
    ],
    destaque: 'Você não precisa ter uma resposta pronta. Precisa começar a construir boas perguntas.',
    cta: 'Quero começar a explorar',
  },

  level2: {
    id: 'level2',
    numero: 2,
    min: 11,
    max: 15,
    nome: 'Algumas pistas, poucos critérios',
    headline:
      'Você já tem pistas do que gostaria de fazer, mas talvez ainda esteja transformando gostos em critérios de escolha.',
    corpo: [
      { tipo: 'p', texto: 'Provavelmente você já consegue perceber algumas coisas sobre si. Talvez pense:' },
      {
        tipo: 'falas',
        itens: [
          'Gosto de Biologia.',
          'Gosto de tecnologia.',
          'Quero trabalhar com pessoas.',
          'Sou criativo(a).',
          'Quero ter liberdade.',
          'Quero uma profissão com boas possibilidades financeiras.',
        ],
      },
      { tipo: 'p', texto: 'Tudo isso importa.' },
      {
        tipo: 'p',
        texto:
          'Mas existe uma distância entre gostar de alguma coisa e compreender como você gostaria de viver profissionalmente. Uma mesma área pode levar a rotinas, ambientes e estilos de trabalho completamente diferentes.',
      },
    ],
    secoes: [
      {
        titulo: 'Seu próximo passo',
        corpo: [
          { tipo: 'p', texto: 'Agora vale transformar suas pistas em critérios mais claros. Por exemplo:' },
          {
            tipo: 'trocas',
            itens: [
              {
                de: 'Gosto de trabalhar com pessoas.',
                para: 'Que tipo de contato com pessoas eu gostaria de ter?',
              },
              {
                de: 'Quero trabalhar com criatividade.',
                para: 'Quero criar o quê? Resolver quais problemas? Para quem? Em que tipo de ambiente?',
              },
              {
                de: 'Quero ganhar bem.',
                para: 'Que papel segurança financeira, crescimento, autonomia e estilo de vida têm na minha escolha?',
              },
            ],
          },
        ],
      },
    ],
    destaque:
      'Quanto mais claros ficam seus critérios, melhor você consegue comparar possibilidades sem depender apenas da sensação de que uma profissão "parece combinar".',
    cta: 'Quero descobrir meus critérios',
  },

  level3: {
    id: 'level3',
    numero: 3,
    min: 16,
    max: 20,
    nome: 'Bons critérios, mapa em expansão',
    headline: 'Você já consegue perceber várias coisas que espera de uma futura profissão.',
    corpo: [
      { tipo: 'p', texto: 'Isso é uma base importante.' },
      { tipo: 'p', texto: 'Você provavelmente já consegue olhar além da pergunta "do que eu gosto?" e começa a considerar também:' },
      {
        tipo: 'lista',
        itens: ['rotina', 'atividades', 'habilidades', 'valores', 'ambiente', 'estilo de vida', 'possibilidades para o futuro'],
      },
      { tipo: 'p', texto: 'Agora aparece um novo desafio: não transformar bons critérios em poucas opções.' },
      {
        tipo: 'p',
        texto:
          'Às vezes alguém percebe que gosta de investigar, criar, liderar, cuidar, ensinar, comunicar ou resolver determinados tipos de problema e associa rapidamente essas características às profissões mais conhecidas.',
      },
      { tipo: 'p', texto: 'Só que seus critérios podem aparecer em caminhos que você ainda nem conhece.' },
    ],
    secoes: [
      {
        titulo: 'Seu próximo passo',
        corpo: [
          { tipo: 'p', texto: 'Agora é hora de ampliar o mapa. Você pode:' },
          {
            tipo: 'lista',
            itens: [
              'conhecer profissões menos óbvias',
              'explorar diferentes áreas dentro da mesma formação',
              'comparar cursos',
              'conversar com profissionais',
              'observar diferentes ambientes de trabalho',
              'pesquisar trajetórias que não seguiram o caminho tradicional',
            ],
          },
        ],
      },
    ],
    destaque:
      'Seu próximo desafio não é apenas conhecer melhor você. É descobrir quantos lugares diferentes no mundo podem conversar com aquilo que você já descobriu sobre si.',
    cta: 'Quero ampliar meu mapa',
  },

  level4: {
    id: 'level4',
    numero: 4,
    min: 21,
    max: 24,
    nome: 'Clareza para explorar',
    headline: 'Você já tem uma boa noção do que espera de uma futura profissão.',
    corpo: [
      { tipo: 'p', texto: 'Você parece conseguir pensar na escolha considerando diferentes dimensões:' },
      {
        tipo: 'lista',
        itens: [
          'seus interesses',
          'suas habilidades',
          'seus valores',
          'a rotina que deseja',
          'o processo de formação',
          'o tipo de vida profissional que gostaria de construir',
        ],
      },
      { tipo: 'p', texto: 'Essa é uma ótima base.' },
      { tipo: 'p', texto: 'Mas existe uma pergunta que pode deixar sua exploração muito mais interessante:' },
      { tipo: 'falas', itens: ['Será que existe apenas um caminho para viver aquilo que eu quero?'] },
    ],
    secoes: [
      {
        titulo: 'Uma formação não é um destino único',
        corpo: [
          {
            tipo: 'p',
            texto:
              'Duas pessoas que fizeram a mesma faculdade podem construir carreiras completamente diferentes. Podem trabalhar em setores diferentes. Assumir funções diferentes. Combinar conhecimentos diferentes. Mudar de área ao longo da vida. Criar novos projetos.',
          },
          {
            tipo: 'p',
            texto:
              'E também pode acontecer o contrário: pessoas que começaram com formações diferentes podem acabar se encontrando em determinados projetos, áreas de atuação ou tipos de função.',
          },
          { tipo: 'p', texto: 'Por isso, pensar carreira apenas como' },
          { tipo: 'trilho', itens: ['Faculdade', 'Profissão', 'Mesmo caminho para sempre'] },
          { tipo: 'p', texto: 'pode limitar sua exploração.' },
        ],
      },
      {
        titulo: 'Seu próximo passo',
        corpo: [
          {
            tipo: 'p',
            texto:
              'Se você já tem bons critérios, não precisa necessariamente escolher mais rápido. Pode explorar melhor. Experimente perguntas como:',
          },
          {
            tipo: 'falas',
            itens: [
              'De quantas maneiras diferentes eu poderia viver essa profissão?',
              'Quais áreas existem dentro dela?',
              'Que outras formações podem se aproximar do tipo de trabalho que quero fazer?',
              'Que combinações entre meus interesses eu ainda não considerei?',
              'Que caminhos profissionais eu nem sei que existem?',
              'Que profissionais chegaram a lugares interessantes por caminhos diferentes?',
            ],
          },
        ],
      },
    ],
    destaque: 'Ter clareza não significa fechar possibilidades. Pode significar estar mais preparado(a) para explorá-las.',
    textoFinal:
      'Orientação Profissional não serve apenas para quem está completamente perdido. Ela também pode ajudar quem já tem boas hipóteses a ampliar repertório, investigar possibilidades e construir caminhos que talvez ainda não estivesse enxergando.',
    cta: 'Quero explorar novos caminhos',
  },
}

// Fecha todos os níveis, igual.
export const blocoFinal = {
  titulo: 'Escolher não é encontrar uma profissão perfeita.',
  abertura: 'É construir um caminho que faça sentido para você. E esse caminho nasce do encontro entre:',
  encontro: ['Quem você é', 'O que existe no mundo', 'O que você pode construir a partir disso'],
  fechamento: [
    'Você pode começar sem saber. Pode começar com algumas opções. Pode até começar praticamente decidido(a).',
    'Em todos esses momentos ainda existem possibilidades que podem ser investigadas.',
  ],
  cta: 'Quero conhecer a Orientação Profissional',
}

// Texto corrido do resultado, para viajar no payload e alimentar o primeiro
// e-mail da sequência. A tela monta o mesmo conteúdo em blocos.
export function textoDoResultado(r) {
  const linhas = [r.headline]

  function despejar(blocos) {
    blocos.forEach((b) => {
      if (b.tipo === 'p') linhas.push(b.texto)
      else if (b.tipo === 'trocas') b.itens.forEach((t) => linhas.push(`Em vez de "${t.de}" perguntar "${t.para}"`))
      else if (b.tipo === 'trilho') linhas.push(b.itens.join(' > '))
      else b.itens.forEach((i) => linhas.push(`- ${i}`))
    })
  }

  despejar(r.corpo)
  r.secoes.forEach((s) => {
    linhas.push(s.titulo)
    despejar(s.corpo)
  })
  linhas.push(r.destaque)
  if (r.textoFinal) linhas.push(r.textoFinal)

  return linhas.join('\n\n')
}
