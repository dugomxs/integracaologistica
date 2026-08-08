/* =============================================================================
   CENTRAL DE CONTEÚDO — Transportadora Integração Logística
   -----------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para atualizar textos,
   telefones, redes sociais, números e regiões de atuação.
   Não é necessário mexer nos componentes.
   ============================================================================= */

/* -----------------------------------------------------------------------------
   1. EMPRESA E CONTATO
   ----------------------------------------------------------------------------- */
export const empresa = {
  nome: 'Integração Logística',
  nomeCompleto: 'Transportadora Integração Logística',
  slogan: 'Entregando Resultados',
  // Assinatura institucional usada pela empresa na apresentação comercial
  tagline: 'Movimentando negócios, entregando confiança',
  // Posicionamento da apresentação institucional
  posicionamento: 'Conectamos caminhos, integramos soluções e entregamos resultados.',
  // TODO CLIENTE: substituir pelo CNPJ real
  cnpj: '00.000.000/0001-00',
  // Matriz, conforme apresentação institucional
  cidade: 'Anápolis',
  uf: 'GO',
  // TODO CLIENTE: endereço e CEP da matriz
  endereco: 'Rua Exemplo, 000 — Bairro',
  cep: '00000-000',
  // Domínio dos e-mails na apresentação é .com (não .com.br)
  // TODO CLIENTE: confirmar se existe um endereço genérico (contato@…)
  email: 'eduardosoares@integracaologistica.com',
  site: 'https://www.integracaologistica.com',
}

/* -----------------------------------------------------------------------------
   2. WHATSAPP — o CTA principal do site
   -----------------------------------------------------------------------------
   numero: DDI + DDD + número, somente dígitos. Ex.: 55 + 11 + 999999999
   A mensagem é pré-preenchida no chat para acelerar a cotação.
   ----------------------------------------------------------------------------- */
// WhatsApp comercial: 55 (Brasil) + 62 (DDD) + 99811-5649
const WHATSAPP_NUMERO = '5562998115649'

export const whatsapp = {
  numero: WHATSAPP_NUMERO,
  numeroFormatado: '(62) 99811-5649',
  mensagemPadrao:
    'Olá! Vim pelo site da Integração Logística e gostaria de solicitar uma cotação de frete.',
}

/**
 * Monta o link wa.me com mensagem pré-preenchida.
 * @param {string} [contexto] Origem do clique — ajuda a identificar de onde veio o lead.
 */
export function linkWhatsApp(contexto) {
  const texto = contexto
    ? `${whatsapp.mensagemPadrao} (${contexto})`
    : whatsapp.mensagemPadrao
  return `https://wa.me/${whatsapp.numero}?text=${encodeURIComponent(texto)}`
}

/* -----------------------------------------------------------------------------
   3. REDES SOCIAIS
   ----------------------------------------------------------------------------- */
export const redes = {
  instagram: {
    handle: '@integracaologistica',
    url: 'https://instagram.com/integracaologistica',
  },
}

/* -----------------------------------------------------------------------------
   4. NAVEGAÇÃO (âncoras do menu)
   ----------------------------------------------------------------------------- */
/* Rótulos curtos de propósito: o header também acomoda o seletor de tema e
   o CTA. "Diferenciais" ficou fora da barra — a seção continua na página,
   logo abaixo de Serviços, no caminho natural da leitura. */
export const navegacao = [
  { id: 'segmentos', rotulo: 'Segmentos' },
  { id: 'servicos', rotulo: 'Serviços' },
  { id: 'processo', rotulo: 'Processo' },
  { id: 'sobre', rotulo: 'Quem somos' },
  { id: 'operacao', rotulo: 'Frota' },
  { id: 'atuacao', rotulo: 'Atuação' },
]

/* -----------------------------------------------------------------------------
   5. HERO
   ----------------------------------------------------------------------------- */
export const hero = {
  eyebrow: 'Transporte rodoviário de cargas',
  titulo: ['Entregando', 'Resultados'],
  subtitulo:
    'Transporte para o agronegócio e para a indústria com frota própria, rede de agregados e seguro por carga. Segurança e pontualidade em cada entrega.',
  ctaPrimario: 'Solicitar Cotação',
  ctaSecundario: 'Ver segmentos',
  // Selos abaixo do CTA — todos verificáveis na apresentação institucional
  selos: ['Frota própria e agregados', 'Seguro por carga até R$ 1,5 mi', 'Filiais em 4 estados'],
}

/* -----------------------------------------------------------------------------
   6. SEGMENTOS
   ----------------------------------------------------------------------------- */
export const segmentos = {
  titulo: 'Dois segmentos. Uma operação precisa.',
  descricao:
    'Cada carga tem uma exigência diferente. Estruturamos a operação para atender o campo e a indústria com o mesmo padrão de controle.',
  itens: [
    {
      id: 'agro',
      indice: '01',
      icone: 'graos',
      nome: 'Agronegócio',
      chamada: 'Da lavoura ao armazém, no tempo da safra.',
      descricao:
        'A operação nasceu no agronegócio. Movimentamos grão, semente e insumo com frota própria e rede de agregados, das filiais em Mato Grosso ao destino.',
      beneficios: [
        'Soja, milho e gergelim',
        'Sementes e fertilizantes',
        'Frota própria e mais de 300 agregados',
        'Filiais no centro da produção',
      ],
    },
    {
      id: 'industria',
      indice: '02',
      icone: 'industria',
      nome: 'Indústrias',
      chamada: 'Sua linha de produção não pode parar.',
      descricao:
        'Químicos, equipamentos e cargas que exigem controle. Atendimento consultivo, com a operação desenhada para causar o mínimo impacto na sua rotina.',
      beneficios: [
        'Produtos químicos',
        'Equipamentos e cargas especiais',
        'Seguro por carga até R$ 1.500.000',
        'Gestão e emissão de fretes',
      ],
    },
  ],
}

/* -----------------------------------------------------------------------------
   6.1 SERVIÇOS — as três frentes descritas na apresentação institucional
   ----------------------------------------------------------------------------- */
export const servicos = {
  eyebrow: 'O que fazemos',
  titulo: 'Três formas de resolver o seu frete',
  descricao:
    'Da carga avulsa à operação de transporte inteira. Você escolhe até onde vai a nossa participação.',
  itens: [
    {
      icone: 'radar',
      nome: 'Gestão e emissão de fretes',
      texto:
        'Conectamos a sua carga à nossa rede de terceiros e conduzimos todo o processo, da aquisição à entrega.',
    },
    {
      icone: 'headset',
      nome: 'Terceirização de contratação',
      texto:
        'Assumimos as atividades operacionais da sua empresa de transporte, com equipe e processo já rodando.',
    },
    {
      icone: 'caminhao',
      nome: 'Transporte com frota própria',
      texto:
        'Nossos 35 conjuntos e mais de 300 agregados na estrada, sob nossa gestão do início ao fim.',
    },
  ],
  rodape: 'Não sabe qual formato encaixa na sua operação? A gente ajuda a decidir.',
}

/* -----------------------------------------------------------------------------
   7. DIFERENCIAIS
   ----------------------------------------------------------------------------- */
/* Textos baseados na apresentação institucional — é a linguagem da própria
   empresa sobre os seus compromissos, não uma lista genérica de setor. */
export const diferenciais = {
  titulo: 'Por que a Integração',
  descricao:
    'Segurança, qualidade e produtividade não são metas por aqui. São compromissos diários.',
  itens: [
    {
      icone: 'escudo',
      titulo: 'Segurança e qualidade',
      texto:
        'Compromisso assumido em cada entrega, com seguro por carga de até R$ 1,5 milhão.',
    },
    {
      icone: 'bussola',
      titulo: 'Flexibilidade é o padrão',
      texto:
        'Nossa equipe se adapta com rapidez e precisão às exigências operacionais de cada parceiro.',
    },
    {
      icone: 'relogio',
      titulo: 'Mínimo impacto na sua rotina',
      texto:
        'Atuamos de forma integrada: o máximo de impacto na eficiência logística, o mínimo na sua operação.',
    },
    {
      icone: 'headset',
      titulo: 'Atendimento consultivo',
      texto:
        'Focado na real necessidade de cada cliente — não num pacote pronto de prateleira.',
    },
    {
      icone: 'caminhao',
      titulo: 'Frota própria e agregados',
      texto:
        '35 conjuntos próprios e uma rede de mais de 300 agregados para escalar no pico da safra.',
    },
    {
      icone: 'equipe',
      titulo: 'Relações de longo prazo',
      texto:
        'Cada operação é conduzida com foco na excelência e na construção de parcerias duradouras.',
    },
  ],
}

/* -----------------------------------------------------------------------------
   7.1 QUEM SOMOS
   ----------------------------------------------------------------------------- */
export const sobre = {
  eyebrow: 'Quem somos',
  // Linha de posicionamento da apresentação institucional
  citacao: 'Conectamos caminhos, integramos soluções e entregamos resultados.',
  paragrafos: [
    'A operação começou com foco no agronegócio e há três anos transporta com segurança e pontualidade. Hoje são sete filiais em Mato Grosso, Goiás, Pará e Paraná, atendendo todo o Brasil.',
    'O crescimento veio de inovação e foco no cliente — e de uma equipe com expertise logística, que entende a exigência de cada carga antes de colocar o veículo na estrada.',
  ],
  matriz: {
    titulo: 'Matriz em Anápolis-GO',
    texto: 'Time de 20 profissionais distribuídos em cinco áreas:',
    departamentos: ['Comercial', 'Operações', 'Mesa de Frete', 'Financeiro', 'Recursos Humanos'],
  },
}

/* -----------------------------------------------------------------------------
   8. COMO FUNCIONA
   ----------------------------------------------------------------------------- */
export const processo = {
  titulo: 'Do orçamento à entrega em 4 passos',
  descricao: 'Processo enxuto para você fechar frete sem burocracia.',
  passos: [
    {
      numero: '01',
      titulo: 'Solicite a cotação',
      texto:
        'Chame no WhatsApp com origem, destino, tipo e peso da carga. Respondemos rápido.',
    },
    {
      numero: '02',
      titulo: 'Aprove a proposta',
      texto:
        'Você recebe valor fechado, prazo e o tipo de equipamento. Aprovou, está agendado.',
    },
    {
      numero: '03',
      titulo: 'Coletamos',
      texto:
        'Veículo no local na data combinada, com documentação e conferência de carregamento.',
    },
    {
      numero: '04',
      titulo: 'Entregamos',
      texto:
        'Acompanhamento durante a rota e confirmação de entrega com comprovante.',
    },
  ],
}

/* -----------------------------------------------------------------------------
   9. NÚMEROS (contadores animados)
   -----------------------------------------------------------------------------
   valor  → número final do contador
   sufixo → texto exibido depois do número (+, %, mil…)
   TODO CLIENTE: ajustar para os números reais da operação.
   ----------------------------------------------------------------------------- */
/* Todos os valores vêm da apresentação institucional da empresa.
   `prefixo` e `sufixo` cercam o número; o contador anima só o valor. */
export const numeros = {
  titulo: 'O tamanho da operação',
  descricao:
    'Três anos transportando com foco no agronegócio, com estrutura própria e capacidade para escalar na safra.',
  itens: [
    {
      valor: 100000,
      sufixo: ' t',
      rotulo: 'Transportadas em 2024',
      detalhe: 'volume movimentado no ano',
    },
    {
      valor: 35,
      sufixo: '',
      rotulo: 'Conjuntos próprios',
      detalhe: 'mais de 300 agregados',
    },
    {
      // Exibido em milhões: "R$ 1.500.000" por extenso não cabe na coluna.
      valor: 1.5,
      decimais: 1,
      prefixo: 'R$ ',
      sufixo: ' mi',
      rotulo: 'Seguro por carga',
      detalhe: 'cobertura máxima',
    },
    {
      valor: 7,
      sufixo: '',
      rotulo: 'Filiais',
      detalhe: 'MT · GO · PA · PR',
    },
  ],
}

/* -----------------------------------------------------------------------------
   10. ÁREA DE ATUAÇÃO
   ----------------------------------------------------------------------------- */
export const atuacao = {
  eyebrow: 'Estamos em constante expansão',
  titulo: 'Sete filiais, quatro estados',
  descricao:
    'Unidades em Mato Grosso, Goiás, Pará e Paraná. Consulte a disponibilidade para a sua rota.',

  /* -----------------------------------------------------------------------
     FILIAIS
     Só cidade, estado e coordenadas — nada além do que é verificável.
     `lat` e `lon` posicionam o pino no mapa automaticamente; para incluir
     uma nova filial, basta acrescentar aqui com as coordenadas da cidade.
     --------------------------------------------------------------------- */
  filiais: [
    { cidade: 'Sorriso', uf: 'MT', estado: 'Mato Grosso', lat: -12.54, lon: -55.71 },
    { cidade: 'Canarana', uf: 'MT', estado: 'Mato Grosso', lat: -13.55, lon: -52.27 },
    { cidade: 'Confresa', uf: 'MT', estado: 'Mato Grosso', lat: -10.64, lon: -51.57 },
    { cidade: 'Rondonópolis', uf: 'MT', estado: 'Mato Grosso', lat: -16.47, lon: -54.64 },
    { cidade: 'Anápolis', uf: 'GO', estado: 'Goiás', lat: -16.33, lon: -48.95 },
    { cidade: 'Miritituba', uf: 'PA', estado: 'Pará', lat: -4.27, lon: -55.98 },
    { cidade: 'Paranaguá', uf: 'PR', estado: 'Paraná', lat: -25.52, lon: -48.51 },
  ],

  rodape: 'Não encontrou a sua rota? Consulte disponibilidade pelo WhatsApp.',
}

/* -----------------------------------------------------------------------------
   11. CTA FINAL
   ----------------------------------------------------------------------------- */
export const ctaFinal = {
  eyebrow: 'Pronto para embarcar',
  titulo: 'Sua próxima carga já tem rota.',
  texto:
    'Envie origem, destino e o tipo de carga. Você recebe a cotação com prazo e valor fechado.',
  botao: 'Solicitar Cotação no WhatsApp',
  observacao: 'Atendimento comercial de segunda a sexta, das 8h às 18h.',
}

/* -----------------------------------------------------------------------------
   12. SEO
   ----------------------------------------------------------------------------- */
export const seo = {
  titulo:
    'Transportadora Integração Logística — Transporte de Cargas para Agro e Indústria',
  descricao:
    'Transporte rodoviário de cargas para o agronegócio e para a indústria. Grãos, insumos, transferências e produto acabado com prazo cumprido e carga rastreada. Solicite sua cotação.',
}
