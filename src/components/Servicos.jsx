import { servicos, linkWhatsApp } from '../config/site'
import { Icone } from './Icones'
import { useAnimacao, revelar } from '../lib/animacoes'
import './Servicos.css'

/**
 * As três frentes de serviço da empresa.
 * Vem logo depois dos segmentos: o visitante já sabe que atendemos o setor
 * dele, aqui descobre de que forma podemos entrar na operação.
 */
export default function Servicos() {
  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.1 })
  }, [])

  return (
    <section id="servicos" className="secao servicos" ref={escopo} aria-labelledby="servicos-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              {servicos.eyebrow}
            </p>
            <h2 id="servicos-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              {servicos.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {servicos.descricao}
          </p>
        </header>

        <ol className="servicos-grade">
          {servicos.itens.map((item, i) => (
            <li className="servico" key={item.nome} data-revelar>
              <span className="servico-numero tabular" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="servico-icone">
                <Icone nome={item.icone} tamanho={24} />
              </span>
              <h3 className="servico-nome">{item.nome}</h3>
              <p className="servico-texto">{item.texto}</p>
            </li>
          ))}
        </ol>

        <div className="servicos-rodape" data-revelar>
          <p>{servicos.rodape}</p>
          <a
            className="servicos-link"
            href={linkWhatsApp('serviços')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar sobre os serviços pelo WhatsApp"
          >
            Falar com o comercial
            <Icone nome="seta" tamanho={16} className="seta" />
          </a>
        </div>
      </div>
    </section>
  )
}
