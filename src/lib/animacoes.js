/* =============================================================================
   CAMADA DE ANIMAÇÃO — GSAP + ScrollTrigger
   -----------------------------------------------------------------------------
   Regras da casa:
   - Só animamos `transform` e `opacity` (propriedades compostas na GPU).
   - Tudo roda dentro de um gsap.context() para limpeza automática no unmount.
   - Se o usuário pediu menos movimento, nada é animado: o conteúdo já nasce visível.
   ============================================================================= */

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** O usuário pediu redução de movimento no sistema operacional? */
export function movimentoReduzido() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hook base de animação.
 * Executa `fn` dentro de um gsap.context com escopo no elemento retornado,
 * garantindo que todos os tweens e ScrollTriggers criados sejam revertidos
 * quando o componente sai da tela.
 *
 * @param {(ctx: { escopo: HTMLElement }) => void} fn
 * @param {any[]} deps
 * @returns {import('react').RefObject<HTMLElement>} ref para o elemento raiz
 */
export function useAnimacao(fn, deps = []) {
  const escopo = useRef(null)

  useLayoutEffect(() => {
    if (movimentoReduzido() || !escopo.current) return
    const ctx = gsap.context(() => fn({ escopo: escopo.current }), escopo)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return escopo
}

/**
 * Reveal padrão do site: fade + slide de baixo para cima, com stagger.
 * Aplica em todos os elementos marcados com [data-revelar] dentro do escopo.
 *
 * @param {HTMLElement} escopo
 * @param {object} [opcoes]
 * @param {string} [opcoes.seletor='[data-revelar]']
 * @param {number} [opcoes.deslocamento=32] distância em px do slide inicial
 * @param {number} [opcoes.stagger=0.09]
 * @param {string} [opcoes.inicio='top 82%'] ponto de disparo do ScrollTrigger
 */
export function revelar(escopo, opcoes = {}) {
  const {
    seletor = '[data-revelar]',
    deslocamento = 32,
    stagger = 0.09,
    inicio = 'top 82%',
  } = opcoes

  const alvos = gsap.utils.toArray(seletor, escopo)
  if (!alvos.length) return

  gsap.fromTo(
    alvos,
    { opacity: 0, y: deslocamento },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: escopo,
        start: inicio,
        // once: dispara uma vez só — evita recomputar em cada passagem de scroll.
        once: true,
      },
    }
  )
}

/**
 * Parallax leve: move o elemento no eixo Y conforme o scroll da seção.
 * `intensidade` positiva = elemento sobe mais devagar que a página.
 *
 * @param {HTMLElement} alvo
 * @param {HTMLElement} gatilho
 * @param {number} [intensidade=80] deslocamento total em px
 */
export function parallax(alvo, gatilho, intensidade = 80) {
  if (!alvo || !gatilho) return

  gsap.to(alvo, {
    y: intensidade,
    ease: 'none',
    scrollTrigger: {
      trigger: gatilho,
      start: 'top top',
      end: 'bottom top',
      // scrub amarra o progresso da animação à barra de rolagem
      scrub: 0.8,
    },
  })
}

/**
 * Desenha um <path> SVG progressivamente conforme o scroll,
 * animando stroke-dashoffset de 100% até 0.
 *
 * @param {SVGPathElement|SVGPathElement[]} paths
 * @param {HTMLElement} gatilho
 * @param {object} [opcoes]
 */
export function desenharRota(paths, gatilho, opcoes = {}) {
  const { inicio = 'top 75%', fim = 'bottom 60%', scrub = 1, stagger = 0 } = opcoes
  const lista = Array.isArray(paths) ? paths.filter(Boolean) : [paths].filter(Boolean)
  if (!lista.length || !gatilho) return

  lista.forEach((path) => {
    const comprimento = path.getTotalLength()
    // dasharray = comprimento total, dashoffset = comprimento → linha invisível.
    gsap.set(path, { strokeDasharray: comprimento, strokeDashoffset: comprimento })
  })

  gsap.to(lista, {
    strokeDashoffset: 0,
    ease: 'none',
    stagger,
    scrollTrigger: {
      trigger: gatilho,
      start: inicio,
      end: fim,
      scrub,
    },
  })
}

/**
 * Contador animado. Anima uma propriedade numérica e escreve o valor
 * formatado em pt-BR no textContent do elemento.
 *
 * @param {HTMLElement} elemento
 * @param {number} valorFinal
 * @param {object} [opcoes]
 */
export function contar(elemento, valorFinal, opcoes = {}) {
  const { duracao = 2, gatilho = elemento, decimais = 0 } = opcoes
  if (!elemento) return

  const estado = { valor: 0 }
  // `decimais` permite exibir valores como "1,5" (usado em "R$ 1,5 mi"):
  // escrever 1.500.000 por extenso não cabe na coluna.
  const formatador = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  })

  gsap.to(estado, {
    valor: valorFinal,
    duration: duracao,
    ease: 'power2.out',
    onUpdate() {
      elemento.textContent = formatador.format(estado.valor)
    },
    scrollTrigger: {
      trigger: gatilho,
      start: 'top 85%',
      once: true,
    },
  })
}

export { gsap, ScrollTrigger }
