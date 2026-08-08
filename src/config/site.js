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
  // TODO CLIENTE: substituir pelo CNPJ real
  cnpj: '00.000.000/0001-00',
  // TODO CLIENTE: substituir pela cidade/UF da base operacional
  cidade: 'Cidade',
  uf: 'UF',
  endereco: 'Rua Exemplo, 000 — Bairro',
  cep: '00000-000',
  email: 'contato@integracaologistica.com.br',
  site: 'https://www.integracaologistica.com.br',
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
export const navegacao = [
  { id: 'segmentos', rotulo: 'Segmentos' },
  { id: 'diferenciais', rotulo: 'Diferenciais' },
  { id: 'processo', rotulo: 'Como funciona' },
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
    'Fretes para o agronegócio e para a indústria com rota planejada, prazo cumprido e carga rastreada do embarque à entrega.',
  ctaPrimario: 'Solicitar Cotação',
  ctaSecundario: 'Ver segmentos',
  // Selos de credibilidade exibidos abaixo do CTA
  selos: ['Frota própria e agregada', 'Carga rastreada', 'Cobertura nacional'],
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
        'Movimentamos grãos, insumos e fertilizantes com janelas de coleta respeitadas e capacidade escalável no pico da safra.',
      beneficios: [
        'Grãos, farelo e insumos agrícolas',
        'Capacidade extra em período de safra',
        'Atendimento a fazendas, cooperativas e armazéns',
        'Documentação e romaneio em ordem',
      ],
    },
    {
      id: 'industria',
      indice: '02',
      icone: 'industria',
      nome: 'Indústrias',
      chamada: 'Sua linha de produção não pode parar.',
      descricao:
        'Transferências, matéria-prima e produto acabado com programação fixa, previsibilidade de prazo e comunicação direta com o time de logística.',
      beneficios: [
        'Transferências entre plantas e CDs',
        'Programação recorrente de embarques',
        'Cargas fechadas e paletizadas',
        'Interlocução direta com o gestor',
      ],
    },
  ],
}

/* -----------------------------------------------------------------------------
   7. DIFERENCIAIS
   ----------------------------------------------------------------------------- */
export const diferenciais = {
  titulo: 'Por que a Integração',
  descricao:
    'Frete não é só deslocar carga. É garantir que ela chegue quando e como foi combinado.',
  itens: [
    {
      icone: 'relogio',
      titulo: 'Pontualidade',
      texto:
        'Prazo definido na cotação e cumprido na entrega. Sem surpresa no meio do caminho.',
    },
    {
      icone: 'radar',
      titulo: 'Rastreabilidade',
      texto:
        'Você acompanha a posição da carga e recebe atualização em cada etapa da rota.',
    },
    {
      icone: 'caminhao',
      titulo: 'Frota adequada',
      texto:
        'Equipamento certo para cada carga: graneleiro, sider, carga seca e conjuntos de alta capacidade.',
    },
    {
      icone: 'bussola',
      titulo: 'Cobertura',
      texto:
        'Rotas em todo o território nacional, com foco nos principais corredores do agro e da indústria.',
    },
    {
      icone: 'headset',
      titulo: 'Atendimento próximo',
      texto:
        'Contato direto no WhatsApp com quem resolve. Sem fila, sem protocolo, sem robô.',
    },
    {
      icone: 'escudo',
      titulo: 'Carga segurada',
      texto:
        'Operação documentada e coberta, com gerenciamento de risco em todo o trajeto.',
    },
  ],
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
export const numeros = {
  titulo: 'Números que sustentam a promessa',
  descricao: 'Resultado de operação organizada e time que conhece a estrada.',
  itens: [
    { valor: 12, sufixo: '', rotulo: 'Anos na estrada', detalhe: 'desde a primeira rota' },
    { valor: 8500, sufixo: '+', rotulo: 'Cargas entregues', detalhe: 'agro e indústria' },
    { valor: 98, sufixo: '%', rotulo: 'Entregas no prazo', detalhe: 'índice de pontualidade' },
    { valor: 24, sufixo: 'h', rotulo: 'Resposta de cotação', detalhe: 'em dias úteis' },
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
