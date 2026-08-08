/* =============================================================================
   FOTOS DA OPERAÇÃO
   -----------------------------------------------------------------------------
   Imagens reais da frota, importadas de src/assets/fotos/.
   O Vite versiona cada arquivo no build (nome com hash), então o navegador
   sempre recebe a versão mais nova sem precisar limpar cache.

   PARA TROCAR UMA FOTO
   1. Coloque o novo arquivo em src/assets/fotos/
   2. Ajuste o import abaixo
   3. Atualize o `alt` — ele é lido por leitores de tela e conta para o SEO.
      Descreva o que aparece, não repita "foto de".

   Tamanhos recomendados (já aplicados nos arquivos atuais):
   - segmentos e galeria: ~800–1000px de largura, JPEG qualidade ~70
   - faixa do CTA final: ~1400px (fica sob overlay escuro, aceita compressão maior)
   ============================================================================= */

import agro from '../assets/fotos/segmento-agro.jpg'
import industria from '../assets/fotos/segmento-industria.jpg'
import ctaEstrada from '../assets/fotos/cta-estrada-entardecer.jpg'
import frotaVermelho from '../assets/fotos/frota-cavalo-vermelho.jpg'
import frotaGraneleiro from '../assets/fotos/frota-graneleiro.jpg'
import armazem from '../assets/fotos/operacao-armazem.jpg'
import noturna from '../assets/fotos/operacao-noturna.jpg'
import descarga from '../assets/fotos/agro-descarga.jpg'
import paletizada from '../assets/fotos/industria-paletizada.jpg'

/* --- Fotos de cada segmento (cabeçalho dos dois cartões) --- */
export const fotosSegmento = {
  agro: {
    src: agro,
    alt: 'Caminhão graneleiro da Integração Logística recebendo grãos direto da colheitadeira na lavoura',
  },
  industria: {
    src: industria,
    alt: 'Carreta carregada com estruturas metálicas para entrega em cliente industrial',
  },
}

/* --- Faixa do CTA final --- */
export const fotoCta = {
  src: ctaEstrada,
  alt: 'Carreta carregada seguindo pela rodovia ao entardecer',
}

/* --- Galeria "Frota em operação" ---
   Cada item vira um cartão. Adicionar ou remover daqui reflete direto na
   seção; o layout se reorganiza sozinho. */
export const galeria = [
  {
    src: descarga,
    alt: 'Colheitadeira descarregando grãos em caminhão graneleiro no meio da lavoura',
    legenda: 'Coleta na lavoura',
    contexto: 'Agronegócio',
  },
  {
    src: noturna,
    alt: 'Caminhões e colheitadeira operando à noite com faróis ligados durante a safra',
    legenda: 'Operação noturna na safra',
    contexto: 'Agronegócio',
  },
  {
    src: paletizada,
    alt: 'Empilhadeira carregando carga paletizada em carreta',
    legenda: 'Carga paletizada',
    contexto: 'Indústria',
  },
  {
    src: frotaVermelho,
    alt: 'Cavalo mecânico Scania engatado em conjunto graneleiro',
    legenda: 'Conjunto de alta capacidade',
    contexto: 'Frota',
  },
  {
    src: armazem,
    alt: 'Caminhões graneleiros posicionados para carregamento dentro de armazém',
    legenda: 'Carregamento em armazém',
    contexto: 'Estrutura',
  },
  {
    src: frotaGraneleiro,
    alt: 'Caminhão graneleiro da frota da Integração Logística pronto para embarque',
    legenda: 'Frota própria e agregada',
    contexto: 'Frota',
  },
]
