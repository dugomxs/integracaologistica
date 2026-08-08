import { ctaFinal, whatsapp, linkWhatsApp } from '../config/site'
import { fotoCta } from '../config/fotos'
import RosaDosVentos from './RosaDosVentos'
import { Icone, IconeWhatsApp } from './Icones'
import { useAnimacao, revelar, gsap } from '../lib/animacoes'
import './CtaFinal.css'

export default function CtaFinal() {
  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.1, deslocamento: 26 })

    // Rosa dos ventos ao fundo gira devagar conforme a seção passa pela tela.
    gsap.to('[data-cta="rosa"]', {
      rotate: 60,
      ease: 'none',
      scrollTrigger: { trigger: escopo, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    })
  }, [])

  return (
    <section className="cta-final" ref={escopo} aria-labelledby="cta-final-titulo">
      {/* Faixa fotográfica: a seção é escura nos dois temas, então o texto
          é sempre claro e o contraste não depende do tema ativo. */}
      <img className="cta-foto" src={fotoCta.src} alt={fotoCta.alt} loading="lazy" decoding="async" />
      <div className="cta-veu" aria-hidden="true" />

      {/* Marca d'água */}
      <RosaDosVentos tamanho={620} className="cta-rosa" data-cta="rosa" />

      <div className="container cta-final-interno">
        <p className="eyebrow" data-revelar>
          {ctaFinal.eyebrow}
        </p>

        <h2 id="cta-final-titulo" className="cta-final-titulo" data-revelar>
          {ctaFinal.titulo}
        </h2>

        <p className="cta-final-texto" data-revelar>
          {ctaFinal.texto}
        </p>

        <div className="cta-final-acoes" data-revelar>
          <a
            className="btn btn-cta-final"
            href={linkWhatsApp('CTA final')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar cotação de frete pelo WhatsApp"
          >
            <IconeWhatsApp tamanho={20} />
            {ctaFinal.botao}
            <Icone nome="seta" tamanho={18} className="seta" />
          </a>
          <span className="cta-final-numero tabular">{whatsapp.numeroFormatado}</span>
        </div>

        <p className="cta-final-obs" data-revelar>
          {ctaFinal.observacao}
        </p>
      </div>
    </section>
  )
}
