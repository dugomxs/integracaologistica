import { useRef } from 'react'
import { hero, linkWhatsApp } from '../config/site'
import RosaDosVentos from './RosaDosVentos'
import { Icone } from './Icones'
import { useAnimacao, gsap, parallax } from '../lib/animacoes'
import './Hero.css'

export default function Hero() {
  const visualRef = useRef(null)
  const secaoRef = useRef(null)

  // Timeline de entrada + parallax do visual.
  const escopo = useAnimacao(({ escopo }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('[data-hero="eyebrow"]', { opacity: 0, y: 16, duration: 0.7 })
      // Cada palavra do título sobe de dentro de uma máscara (overflow: hidden)
      .from(
        '[data-hero="palavra"]',
        { yPercent: 115, duration: 1.1, stagger: 0.09 },
        '-=0.35'
      )
      .from('[data-hero="sub"]', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('[data-hero="cta"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, '-=0.5')
      .from('[data-hero="selo"]', { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, '-=0.45')
      .from(
        '[data-hero="visual"]',
        { opacity: 0, scale: 0.88, rotate: -25, duration: 1.6, ease: 'power2.out' },
        0.15
      )
      .from('[data-hero="rolar"]', { opacity: 0, duration: 0.6 }, '-=0.3')

    // Parallax leve: o visual desce mais devagar que o texto ao rolar.
    parallax(visualRef.current, secaoRef.current, 110)
    gsap.to('[data-hero="conteudo"]', {
      y: -40,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: {
        trigger: secaoRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    return () => tl.kill()
  }, [])

  return (
    <section
      id="topo"
      className="hero"
      ref={(el) => {
        escopo.current = el
        secaoRef.current = el
      }}
    >
      {/* Brilho radial atrás do conteúdo */}
      <div className="hero-aura" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-conteudo" data-hero="conteudo">
          <p className="eyebrow" data-hero="eyebrow">
            {hero.eyebrow}
          </p>

          <h1 className="hero-titulo">
            {hero.titulo.map((palavra, i) => (
              <span className="hero-mascara" key={palavra}>
                <span className="hero-palavra" data-hero="palavra">
                  {palavra}
                  {i === hero.titulo.length - 1 && <em className="hero-ponto">.</em>}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub" data-hero="sub">
            {hero.subtitulo}
          </p>

          <div className="hero-acoes">
            <a
              className="btn btn-hero"
              href={linkWhatsApp('hero')}
              target="_blank"
              rel="noopener noreferrer"
              data-hero="cta"
              aria-label="Solicitar cotação de frete pelo WhatsApp"
            >
              {hero.ctaPrimario}
              <Icone nome="seta" tamanho={18} className="seta" />
            </a>
            <a className="btn btn-contorno" href="#segmentos" data-hero="cta">
              {hero.ctaSecundario}
              <Icone nome="setaBaixo" tamanho={18} className="seta" />
            </a>
          </div>

          <ul className="hero-selos">
            {hero.selos.map((selo) => (
              <li key={selo} data-hero="selo">
                <Icone nome="check" tamanho={14} />
                {selo}
              </li>
            ))}
          </ul>
        </div>

        {/* --- Visual: rosa dos ventos + rotas --- */}
        <div className="hero-visual" data-hero="visual" ref={visualRef} aria-hidden="true">
          <div className="hero-visual-palco">
            <svg className="hero-rotas" viewBox="0 0 500 500" fill="none">
              <defs>
                <linearGradient id="rota-grad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" style={{ stopColor: 'var(--azul)' }} stopOpacity="0" />
                  <stop offset="45%" style={{ stopColor: 'var(--azul-claro)' }} stopOpacity="0.9" />
                  <stop offset="100%" style={{ stopColor: 'var(--azul)' }} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Rotas em fluxo contínuo: o tracejado corre pela curva */}
              <path className="rota-fluxo" d="M20 340 C 130 300, 150 170, 250 150 S 400 210, 480 140" stroke="url(#rota-grad)" strokeWidth="1.5" />
              <path className="rota-fluxo rota-atraso-1" d="M10 200 C 120 250, 180 380, 300 370 S 440 300, 495 330" stroke="url(#rota-grad)" strokeWidth="1.5" />
              <path className="rota-fluxo rota-atraso-2" d="M250 10 C 250 120, 190 200, 250 250 S 320 380, 250 490" stroke="url(#rota-grad)" strokeWidth="1" strokeOpacity="0.5" />
              {/* Pontos de nó nas rotas */}
              <circle className="rota-no" cx="250" cy="150" r="3" />
              <circle className="rota-no rota-atraso-1" cx="300" cy="370" r="3" />
              <circle className="rota-no rota-atraso-2" cx="480" cy="140" r="2.5" />
            </svg>

            <div className="hero-orbita hero-orbita-1" />
            <div className="hero-orbita hero-orbita-2" />
            <RosaDosVentos tamanho={420} className="hero-rosa" />
          </div>
        </div>
      </div>

      <a href="#segmentos" className="hero-rolar" data-hero="rolar" aria-label="Rolar para os segmentos">
        <span className="hero-rolar-texto">Role</span>
        <span className="hero-rolar-trilho">
          <span className="hero-rolar-ponto" />
        </span>
      </a>
    </section>
  )
}
