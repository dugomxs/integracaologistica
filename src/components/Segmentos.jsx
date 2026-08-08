import { segmentos, linkWhatsApp } from '../config/site'
import { fotosSegmento } from '../config/fotos'
import { Icone } from './Icones'
import { useAnimacao, revelar } from '../lib/animacoes'
import './Segmentos.css'

export default function Segmentos() {
  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.12 })
  }, [])

  /** Halo do cartão segue o cursor: grava a posição em variáveis CSS. */
  const moverHalo = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="segmentos" className="secao" ref={escopo} aria-labelledby="segmentos-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              Segmentos atendidos
            </p>
            <h2 id="segmentos-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              {segmentos.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {segmentos.descricao}
          </p>
        </header>

        <div className="segmentos-grade">
          {segmentos.itens.map((item) => (
            <article
              key={item.id}
              className="cartao segmento"
              data-revelar
              onMouseMove={moverHalo}
            >
              {/* Foto real da operação — prova visual antes do texto */}
              <figure className="segmento-foto">
                {/* A máscara recorta o zoom da imagem; o ícone fica fora dela
                    para poder ultrapassar a borda inferior da foto. */}
                <span className="segmento-foto-mascara">
                  <img
                    src={fotosSegmento[item.id].src}
                    alt={fotosSegmento[item.id].alt}
                    width="1000"
                    height="562"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                {/* Índice grande sobre a foto */}
                <span className="segmento-indice tabular" aria-hidden="true">
                  {item.indice}
                </span>
                <div className="segmento-icone">
                  <Icone nome={item.icone} tamanho={26} />
                </div>
              </figure>

              <h3 className="segmento-nome">{item.nome}</h3>
              <p className="segmento-chamada">{item.chamada}</p>
              <p className="segmento-descricao">{item.descricao}</p>

              <ul className="segmento-beneficios">
                {item.beneficios.map((beneficio) => (
                  <li key={beneficio}>
                    <Icone nome="check" tamanho={14} />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>

              <a
                className="segmento-cta"
                href={linkWhatsApp(`segmento ${item.nome}`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Solicitar cotação para ${item.nome} pelo WhatsApp`}
              >
                Cotar frete para {item.nome.toLowerCase()}
                <Icone nome="seta" tamanho={16} className="seta" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
