import { useRef } from 'react'
import { processo, linkWhatsApp } from '../config/site'
import { Icone } from './Icones'
import { useAnimacao, revelar, desenharRota, gsap } from '../lib/animacoes'
import './Processo.css'

/* Coordenadas dos nós no viewBox 1200×120 — alinhadas ao centro de cada
   uma das 4 colunas (12,5% · 37,5% · 62,5% · 87,5%). */
const NOS = [
  { x: 150, y: 60 },
  { x: 450, y: 34 },
  { x: 750, y: 76 },
  { x: 1050, y: 40 },
]

const CAMINHO =
  'M0,72 C 60,72 90,60 150,60 S 330,30 450,34 S 640,78 750,76 S 950,38 1050,40 C 1110,41 1150,50 1200,52'

export default function Processo() {
  const rotaRef = useRef(null)
  const trilhoRef = useRef(null)

  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.1 })

    // matchMedia garante que só a animação da faixa ativa seja criada,
    // e que ela seja revertida automaticamente ao trocar de breakpoint.
    const mm = gsap.matchMedia()

    // Desktop: a rota é desenhada em SVG conforme o scroll avança na seção.
    mm.add('(min-width: 1000px)', () => {
      desenharRota(rotaRef.current, escopo, {
        inicio: 'top 70%',
        fim: 'bottom 75%',
        scrub: 1,
      })
      // Os nós acendem em sequência acompanhando o traço.
      gsap.fromTo(
        '[data-no]',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          stagger: 0.18,
          scrollTrigger: { trigger: escopo, start: 'top 60%', once: true },
        }
      )
    })

    // Mobile/tablet: trilho vertical crescendo (transform puro, sem SVG).
    mm.add('(max-width: 999px)', () => {
      gsap.fromTo(
        trilhoRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.processo-passos',
            start: 'top 78%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="processo" className="secao" ref={escopo} aria-labelledby="processo-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              Como funciona
            </p>
            <h2 id="processo-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              {processo.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {processo.descricao}
          </p>
        </header>

        <div className="processo-mapa">
          {/* Rota desenhada — visível a partir de 1000px */}
          <svg
            className="processo-rota"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="processo-grad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" style={{ stopColor: 'var(--azul)' }} />
                <stop offset="55%" style={{ stopColor: 'var(--azul-claro)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--azul-brilho)' }} />
              </linearGradient>
            </defs>

            {/* Trilho de fundo, sempre visível */}
            <path
              d={CAMINHO}
              style={{ stroke: 'var(--linha)' }}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Traço que se desenha com o scroll */}
            <path
              ref={rotaRef}
              d={CAMINHO}
              stroke="url(#processo-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {NOS.map((no, i) => (
              <g key={i} data-no>
                <circle
                  cx={no.x}
                  cy={no.y}
                  r="9"
                  style={{ fill: 'var(--fundo)', stroke: 'var(--azul)' }}
                  strokeWidth="1.5"
                />
                <circle cx={no.x} cy={no.y} r="3" style={{ fill: 'var(--azul-claro)' }} />
              </g>
            ))}
          </svg>

          {/* Trilho vertical — mobile/tablet */}
          <span className="processo-trilho-base" aria-hidden="true">
            <span className="processo-trilho" ref={trilhoRef} />
          </span>

          <ol className="processo-passos">
            {processo.passos.map((passo) => (
              <li className="passo" key={passo.numero} data-revelar>
                <span className="passo-marcador" aria-hidden="true" />
                <span className="passo-numero tabular">{passo.numero}</span>
                <h3 className="passo-titulo">{passo.titulo}</h3>
                <p className="passo-texto">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="processo-rodape" data-revelar>
          <p>Leva menos de um minuto para pedir a primeira cotação.</p>
          <a
            className="btn"
            href={linkWhatsApp('como funciona')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Começar cotação pelo WhatsApp"
          >
            Começar agora
            <Icone nome="seta" tamanho={18} className="seta" />
          </a>
        </div>
      </div>
    </section>
  )
}
