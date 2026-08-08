import { galeria } from '../config/fotos'
import { linkWhatsApp } from '../config/site'
import { Icone } from './Icones'
import { useAnimacao, revelar } from '../lib/animacoes'
import './Galeria.css'

/**
 * Prova visual: fotos reais da frota e das operações.
 * Vem depois dos Números para sustentar as estatísticas com evidência.
 */
export default function Galeria() {
  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.07, deslocamento: 26 })
  }, [])

  return (
    <section id="operacao" className="secao galeria" ref={escopo} aria-labelledby="galeria-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              Frota em operação
            </p>
            <h2 id="galeria-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              Não é foto de banco de imagens
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            Registros das nossas cargas, do carregamento na lavoura à entrega na indústria.
            É esta a estrutura que vai atender o seu frete.
          </p>
        </header>

        <ul className="galeria-grade">
          {galeria.map((foto) => (
            <li className="galeria-item" key={foto.src} data-revelar>
              <img
                src={foto.src}
                alt={foto.alt}
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <div className="galeria-info">
                <span className="galeria-contexto">{foto.contexto}</span>
                <span className="galeria-legenda">{foto.legenda}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="galeria-rodape" data-revelar>
          <p>Quer ver o equipamento certo para a sua carga?</p>
          <a
            className="galeria-link"
            href={linkWhatsApp('galeria da frota')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar sobre a frota pelo WhatsApp"
          >
            Falar com a operação
            <Icone nome="seta" tamanho={16} className="seta" />
          </a>
        </div>
      </div>
    </section>
  )
}
