/* =============================================================================
   ROSA DOS VENTOS — motif da marca (retirado do logo).
   Aparece no header, no hero, no CTA final e no rodapé.
   Construída em SVG puro: escala sem perder nitidez e é animável por CSS/GSAP.

   Cores: tudo sai dos tokens de tema. O corpo da estrela usa `currentColor`,
   então basta definir `color` no CSS de quem a utiliza.
   ============================================================================= */

import { useId } from 'react'

// Marcações do anel externo: uma a cada 5°, sendo as de 45° mais longas.
const marcacoes = Array.from({ length: 72 }, (_, i) => {
  const angulo = i * 5
  const principal = angulo % 45 === 0
  return { angulo, principal }
})

export default function RosaDosVentos({
  tamanho = 200,
  detalhado = true,
  className = '',
  ...props
}) {
  // A rosa é renderizada várias vezes na mesma página; sem IDs únicos os
  // gradientes de todas as instâncias resolveriam para a primeira do DOM.
  const uid = useId().replace(/:/g, '')
  const idAgulha = `rosa-agulha-${uid}`
  const idCorpo = `rosa-corpo-${uid}`

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <linearGradient id={idAgulha} x1="100" y1="16" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: 'var(--azul-brilho)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--azul)' }} />
        </linearGradient>
        {/* currentColor: o corpo da estrela acompanha a cor de quem a usa,
            ficando branco no tema escuro e grafite no claro. */}
        <linearGradient id={idCorpo} x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* Anel externo + marcações de grau */}
      {detalhado && (
        <g className="rosa-anel">
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="100" cy="100" r="78" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          {marcacoes.map(({ angulo, principal }) => (
            <line
              key={angulo}
              x1="100"
              y1={principal ? 82 : 87}
              x2="100"
              y2="94"
              stroke="currentColor"
              strokeOpacity={principal ? 0.45 : 0.18}
              strokeWidth="1"
              transform={`rotate(${angulo} 100 100)`}
            />
          ))}
        </g>
      )}

      {/* Estrela menor (rumos colaterais NE/SE/SO/NO) */}
      <path
        d="M100 38 L107 93 L162 100 L107 107 L100 162 L93 107 L38 100 L93 93 Z"
        fill="currentColor"
        fillOpacity="0.22"
        transform="rotate(45 100 100)"
      />

      {/* Estrela principal — braços cardeais */}
      <path
        d="M100 16 L109 91 L184 100 L109 109 L100 184 L91 109 L16 100 L91 91 Z"
        fill={`url(#${idCorpo})`}
      />

      {/* Agulha Norte em azul — o "sinal" da marca */}
      <path d="M100 16 L109 91 L100 100 L91 91 Z" fill={`url(#${idAgulha})`} />

      {/* Núcleo */}
      <circle
        cx="100"
        cy="100"
        r="6.5"
        style={{ fill: 'var(--fundo)' }}
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="100" r="1.8" style={{ fill: 'var(--azul-claro)' }} />

      {/* Letras cardeais */}
      {detalhado && (
        <g
          fill="currentColor"
          fillOpacity="0.55"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fontWeight="600"
          textAnchor="middle"
        >
          <text x="100" y="10">N</text>
          <text x="194" y="104">L</text>
          <text x="100" y="199">S</text>
          <text x="6" y="104">O</text>
        </g>
      )}
    </svg>
  )
}
