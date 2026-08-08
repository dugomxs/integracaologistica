import { clientes } from '../config/clientes'
import { useAnimacao, revelar } from '../lib/animacoes'
import './Clientes.css'

/**
 * Prova social. Vem depois de "Quem somos" e antes dos números:
 * quem é a empresa → quem já confia nela → qual o tamanho da operação.
 */
export default function Clientes() {
  const escopo = useAnimacao(({ escopo }) => {
    // Stagger curto: doze logos entrando em cascata, não um a um.
    revelar(escopo, { stagger: 0.045, deslocamento: 20 })
  }, [])

  return (
    <section id="clientes" className="secao clientes" ref={escopo} aria-labelledby="clientes-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              {clientes.eyebrow}
            </p>
            <h2 id="clientes-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              {clientes.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {clientes.descricao}
          </p>
        </header>

        <ul className="clientes-grade">
          {clientes.logos.map((cliente) => (
            <li className="cliente" key={cliente.nome} data-revelar>
              <img
                src={cliente.src}
                alt={cliente.nome}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
