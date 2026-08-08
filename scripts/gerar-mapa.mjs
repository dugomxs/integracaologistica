/* =============================================================================
   GERADOR DO MAPA — src/lib/brasil.js
   -----------------------------------------------------------------------------
   Baixa as malhas oficiais do IBGE (contorno do país e divisas estaduais),
   simplifica, projeta e grava um módulo JS com os paths prontos.

       node scripts/gerar-mapa.mjs

   Rodar de novo só é necessário se quiser outra resolução ou se o IBGE
   publicar uma malha nova. O arquivo gerado é versionado junto com o projeto,
   então o build NÃO depende de rede.
   ============================================================================= */

import fs from 'node:fs/promises'
import path from 'node:path'

const IBGE = 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR'
const QUALIDADE = 'intermediaria'

// Tolerâncias do Douglas-Peucker, em graus.
// O mapa tem ~11px por grau, então 0,05° ≈ 0,6px — detalhe imperceptível a menos.
const TOL_PAIS = 0.045
const TOL_ESTADOS = 0.07

// Descarta ilhas menores que isto (graus²). Fernando de Noronha, Trindade e
// ilhotas costeiras viram ruído nesta escala; Marajó (~3,3°²) permanece.
const AREA_MINIMA = 0.05

const MARGEM = 20
const ALTURA_UTIL = 420

/* ------------------------------- utilidades ------------------------------- */

async function baixar(url) {
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error(`IBGE respondeu ${resposta.status} para ${url}`)
  return resposta.json()
}

/** Distância perpendicular de um ponto ao segmento a-b. */
function distancia(p, a, b) {
  let [x, y] = a
  let dx = b[0] - x
  let dy = b[1] - y
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy)
    if (t > 1) [x, y] = b
    else if (t > 0) {
      x += dx * t
      y += dy * t
    }
  }
  dx = p[0] - x
  dy = p[1] - y
  return Math.sqrt(dx * dx + dy * dy)
}

/** Douglas-Peucker iterativo — evita estouro de pilha em anéis longos. */
function simplificar(pontos, tolerancia) {
  if (pontos.length <= 3) return pontos
  const manter = new Uint8Array(pontos.length)
  manter[0] = manter[pontos.length - 1] = 1
  const pilha = [[0, pontos.length - 1]]

  while (pilha.length) {
    const [inicio, fim] = pilha.pop()
    let maior = 0
    let indice = -1
    for (let i = inicio + 1; i < fim; i++) {
      const d = distancia(pontos[i], pontos[inicio], pontos[fim])
      if (d > maior) {
        maior = d
        indice = i
      }
    }
    if (maior > tolerancia && indice > 0) {
      manter[indice] = 1
      pilha.push([inicio, indice], [indice, fim])
    }
  }
  return pontos.filter((_, i) => manter[i])
}

/** Área do anel pela fórmula do shoelace (em graus²). */
function area(anel) {
  let soma = 0
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    soma += (anel[j][0] + anel[i][0]) * (anel[j][1] - anel[i][1])
  }
  return Math.abs(soma / 2)
}

/** Extrai todos os anéis externos de um Feature, já filtrados por área. */
function aneis(feature) {
  const { type, coordinates } = feature.geometry
  const poligonos = type === 'Polygon' ? [coordinates] : coordinates
  return poligonos.map((p) => p[0]).filter((anel) => area(anel) >= AREA_MINIMA)
}

/* -------------------------------- geração -------------------------------- */

console.log('Baixando malhas do IBGE…')
const [pais, estados] = await Promise.all([
  baixar(`${IBGE}?formato=application/vnd.geo+json&qualidade=${QUALIDADE}`),
  baixar(`${IBGE}?formato=application/vnd.geo+json&intrarregiao=UF&qualidade=${QUALIDADE}`),
])

const aneisPais = pais.features.flatMap(aneis).map((a) => simplificar(a, TOL_PAIS))
const aneisEstados = estados.features.flatMap(aneis).map((a) => simplificar(a, TOL_ESTADOS))

// Enquadramento a partir do contorno continental já filtrado.
let lonMin = Infinity
let lonMax = -Infinity
let latMin = Infinity
let latMax = -Infinity
for (const anel of aneisPais) {
  for (const [lon, lat] of anel) {
    if (lon < lonMin) lonMin = lon
    if (lon > lonMax) lonMax = lon
    if (lat < latMin) latMin = lat
    if (lat > latMax) latMax = lat
  }
}

const ESCALA_Y = ALTURA_UTIL / (latMax - latMin)
// cos(latitude média) devolve a proporção correta: 1° de longitude cobre
// menos quilômetros que 1° de latitude fora do equador.
const ESCALA_X = ESCALA_Y * Math.cos((((latMax + latMin) / 2) * Math.PI) / 180)

const LARGURA = Math.round((lonMax - lonMin) * ESCALA_X + MARGEM * 2)
const ALTURA = ALTURA_UTIL + MARGEM * 2

const projetar = ([lon, lat]) => [
  (lon - lonMin) * ESCALA_X + MARGEM,
  (latMax - lat) * ESCALA_Y + MARGEM,
]

const paraPath = (listaDeAneis) =>
  listaDeAneis
    .map(
      (anel) =>
        anel
          .map((ponto, i) => {
            const [x, y] = projetar(ponto)
            return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
          })
          .join('') + 'Z'
    )
    .join('')

const CAMINHO_BRASIL = paraPath(aneisPais)
const CAMINHO_ESTADOS = paraPath(aneisEstados)

const pontos = (l) => l.reduce((s, a) => s + a.length, 0)
console.log(`  país   : ${aneisPais.length} anéis, ${pontos(aneisPais)} pontos, ${(CAMINHO_BRASIL.length / 1024).toFixed(1)} kB`)
console.log(`  estados: ${aneisEstados.length} anéis, ${pontos(aneisEstados)} pontos, ${(CAMINHO_ESTADOS.length / 1024).toFixed(1)} kB`)

const modulo = `/* =============================================================================
   MAPA DO BRASIL — ARQUIVO GERADO. Não edite à mão.
   -----------------------------------------------------------------------------
   Fonte: malhas territoriais do IBGE (qualidade "${QUALIDADE}"), simplificadas
   por Douglas-Peucker e projetadas para o viewBox abaixo.

   Para regenerar:  node scripts/gerar-mapa.mjs

   A projeção é equirretangular com correção de proporção — sem o fator
   cos(latitude) o país sai espremido na horizontal. \`projetar()\` usa exatamente
   as mesmas constantes do contorno, então os pinos das filiais nunca saem do
   lugar em relação ao desenho.
   ============================================================================= */

export const VIEWBOX_LARGURA = ${LARGURA}
export const VIEWBOX_ALTURA = ${ALTURA}
export const VIEWBOX = '0 0 ${LARGURA} ${ALTURA}'

const LON_MIN = ${lonMin}
const LAT_MAX = ${latMax}
const ESCALA_X = ${ESCALA_X}
const ESCALA_Y = ${ESCALA_Y}
const MARGEM = ${MARGEM}

/**
 * Converte coordenadas geográficas em coordenadas do viewBox.
 * @param {{lat: number, lon: number}} local
 */
export function projetar({ lat, lon }) {
  return {
    x: (lon - LON_MIN) * ESCALA_X + MARGEM,
    y: (LAT_MAX - lat) * ESCALA_Y + MARGEM,
  }
}

/** Contorno do território nacional. */
export const CAMINHO_BRASIL =
  '${CAMINHO_BRASIL}'

/** Divisas das 26 unidades federativas + Distrito Federal. */
export const CAMINHO_ESTADOS =
  '${CAMINHO_ESTADOS}'
`

const destino = path.join(process.cwd(), 'src/lib/brasil.js')
await fs.writeFile(destino, modulo)
console.log(`\nGravado em ${destino}`)
console.log(`viewBox: 0 0 ${LARGURA} ${ALTURA}`)
