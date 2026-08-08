import { useRef, useState } from 'react'
import { atuacao, linkWhatsApp } from '../config/site'
import { Icone } from './Icones'
import { useAnimacao, revelar, desenharRota, gsap } from '../lib/animacoes'
import { CAMINHO_BRASIL, CAMINHO_ESTADOS, VIEWBOX, VIEWBOX_LARGURA, projetar } from '../lib/brasil'
import './Atuacao.css'

// Posição de cada filial, calculada uma única vez.
const PONTOS = atuacao.filiais.map((filial) => ({
  ...filial,
  id: `${filial.cidade}-${filial.uf}`,
  ...projetar(filial),
}))

/* Rótulo do pino em destaque.
   Vai numa plaquinha ACIMA do pino, e não ao lado: com o rótulo à direita,
   nomes longos como "Rondonópolis" atravessavam os pinos vizinhos.
   A largura é estimada pelo número de caracteres (a fonte é monoespaçada,
   então o cálculo é exato) e a plaqueta é presa dentro do viewBox para não
   vazar nas filiais próximas às bordas. */
const LARGURA_CARACTERE = 6.1 // monoespaçada 9px + espaçamento entre letras
const ALTURA_PLACA = 17

function placa(filial) {
  const texto = filial.cidade.toUpperCase()
  const largura = texto.length * LARGURA_CARACTERE + 14
  const x = Math.min(Math.max(filial.x - largura / 2, 2), VIEWBOX_LARGURA - largura - 2)
  return {
    texto,
    largura,
    x,
    y: filial.y - 13 - ALTURA_PLACA,
    centro: x + largura / 2,
  }
}

export default function Atuacao() {
  const [ativa, setAtiva] = useState(null)
  const contornoRef = useRef(null)

  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.06 })

    // O contorno do mapa se desenha conforme o scroll.
    desenharRota(contornoRef.current, escopo, {
      inicio: 'top 72%',
      fim: 'center 60%',
      scrub: 1,
    })

    // Pinos surgem em sequência.
    gsap.fromTo(
      '[data-pino]',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'back.out(2.2)',
        stagger: 0.08,
        scrollTrigger: { trigger: escopo, start: 'top 55%', once: true },
      }
    )
  }, [])

  return (
    <section id="atuacao" className="secao" ref={escopo} aria-labelledby="atuacao-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              {atuacao.eyebrow}
            </p>
            <h2 id="atuacao-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              {atuacao.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {atuacao.descricao}
          </p>
        </header>

        <div className="atuacao-grade">
          {/* --- Lista de filiais --- */}
          <ul className="filiais">
            {PONTOS.map((filial) => (
              <li
                key={filial.id}
                className={`filial ${ativa === filial.id ? 'ativa' : ''}`}
                data-revelar
                onMouseEnter={() => setAtiva(filial.id)}
                onMouseLeave={() => setAtiva(null)}
              >
                <span className="filial-pino">
                  <Icone nome="local" tamanho={17} />
                </span>
                <span className="filial-info">
                  <strong>
                    {filial.cidade}
                    <span className="filial-uf">{filial.uf}</span>
                  </strong>
                  <span>{filial.estado}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* --- Diagrama --- */}
          <div className="atuacao-mapa" data-revelar>
            <svg
              viewBox={VIEWBOX}
              fill="none"
              role="img"
              aria-label={`Mapa do Brasil com as ${PONTOS.length} filiais da Integração Logística: ${PONTOS.map(
                (f) => `${f.cidade} ${f.uf}`
              ).join(', ')}`}
            >
              <defs>
                <linearGradient id="mapa-grad" x1="60" y1="20" x2="380" y2="440" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" style={{ stopColor: 'var(--azul-claro)' }} />
                  <stop offset="100%" style={{ stopColor: 'var(--azul)' }} />
                </linearGradient>
              </defs>

              {/* Preenchimento sutil do território */}
              <path d={CAMINHO_BRASIL} style={{ fill: 'var(--azul-vidro)' }} strokeLinejoin="round" />

              {/* Divisas estaduais — traço fino, sob o contorno do país */}
              <path
                d={CAMINHO_ESTADOS}
                fill="none"
                strokeWidth="0.6"
                strokeLinejoin="round"
                style={{ stroke: 'var(--azul)', strokeOpacity: 0.28 }}
              />

              {/* Contorno que se desenha com o scroll */}
              <path
                ref={(el) => {
                  contornoRef.current = el
                }}
                d={CAMINHO_BRASIL}
                stroke="url(#mapa-grad)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeOpacity="0.8"
              />

              {/* Pinos das filiais */}
              {PONTOS.map((filial) => {
                const destacada = ativa === filial.id
                return (
                  <g key={filial.id} data-pino style={{ transformOrigin: `${filial.x}px ${filial.y}px` }}>
                    <circle
                      cx={filial.x}
                      cy={filial.y}
                      r="17"
                      opacity={destacada ? 0.26 : 0}
                      style={{ fill: 'var(--azul)', transition: 'opacity 0.3s ease' }}
                    />
                    <circle
                      cx={filial.x}
                      cy={filial.y}
                      r="6.5"
                      style={{ fill: 'var(--fundo)', stroke: 'var(--azul-claro)' }}
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={filial.x}
                      cy={filial.y}
                      r="2.8"
                      style={{ fill: destacada ? 'var(--azul)' : 'var(--azul-claro)' }}
                    />

                    {/* O rótulo só aparece na filial ativa: são 7 pinos, e quatro
                        deles ficam agrupados em Mato Grosso — rótulos fixos se
                        sobreporiam. A lista ao lado carrega todos os nomes. */}
                    {destacada &&
                      (() => {
                        const p = placa(filial)
                        return (
                          <g style={{ pointerEvents: 'none' }}>
                            <rect
                              x={p.x}
                              y={p.y}
                              width={p.largura}
                              height={ALTURA_PLACA}
                              rx="3"
                              style={{ fill: 'var(--titulo)' }}
                            />
                            <text
                              x={p.centro}
                              y={p.y + 12}
                              textAnchor="middle"
                              fontFamily="ui-monospace, monospace"
                              fontSize="9"
                              fontWeight="600"
                              letterSpacing="0.08em"
                              style={{ fill: 'var(--fundo)' }}
                            >
                              {p.texto}
                            </text>
                          </g>
                        )
                      })()}
                  </g>
                )
              })}
            </svg>

            <p className="atuacao-legenda">
              Passe o mouse sobre uma filial para localizá-la no mapa
            </p>
          </div>
        </div>

        <div className="atuacao-rodape" data-revelar>
          <p>{atuacao.rodape}</p>
          <a
            className="atuacao-link"
            href={linkWhatsApp('consulta de rota')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar disponibilidade de rota pelo WhatsApp"
          >
            Consultar minha rota
            <Icone nome="seta" tamanho={16} className="seta" />
          </a>
        </div>
      </div>
    </section>
  )
}
