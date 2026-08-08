import { sobre } from '../config/site'
import RosaDosVentos from './RosaDosVentos'
import { useAnimacao, revelar, gsap } from '../lib/animacoes'
import './Sobre.css'

/**
 * Quem somos. Vem antes dos Números: primeiro o visitante entende quem está
 * por trás da operação, depois vê o tamanho dela.
 */
export default function Sobre() {
  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.09 })

    // A bússola ao fundo gira devagar conforme a seção atravessa a tela.
    gsap.to('[data-sobre="rosa"]', {
      rotate: 45,
      ease: 'none',
      scrollTrigger: { trigger: escopo, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    })
  }, [])

  return (
    <section id="sobre" className="secao sobre" ref={escopo} aria-labelledby="sobre-titulo">
      <RosaDosVentos tamanho={520} className="sobre-rosa" data-sobre="rosa" />

      <div className="container sobre-grade">
        <div className="sobre-texto">
          <p className="eyebrow" data-revelar>
            {sobre.eyebrow}
          </p>

          {/* A citação é a linha de posicionamento da própria empresa */}
          <blockquote id="sobre-titulo" className="sobre-citacao" data-revelar>
            {sobre.citacao}
          </blockquote>

          {sobre.paragrafos.map((p) => (
            <p className="sobre-paragrafo" key={p} data-revelar>
              {p}
            </p>
          ))}
        </div>

        <aside className="sobre-matriz" data-revelar>
          <h3 className="sobre-matriz-titulo">{sobre.matriz.titulo}</h3>
          <p className="sobre-matriz-texto">{sobre.matriz.texto}</p>
          <ul className="sobre-departamentos">
            {sobre.matriz.departamentos.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
