import { useRef } from 'react'
import { numeros } from '../config/site'
import { useAnimacao, revelar, contar, movimentoReduzido } from '../lib/animacoes'
import './Numeros.css'

export default function Numeros() {
  const valoresRef = useRef([])

  const escopo = useAnimacao(({ escopo }) => {
    revelar(escopo, { stagger: 0.1 })

    // Cada contador é disparado pela própria seção, para que todos subam juntos.
    valoresRef.current.forEach((el, i) => {
      contar(el, numeros.itens[i].valor, {
        duracao: 2.2,
        gatilho: escopo,
        decimais: numeros.itens[i].decimais ?? 0,
      })
    })
  }, [])

  // Sem animação, o número já aparece formatado no HTML inicial.
  const reduzido = movimentoReduzido()
  const formatar = (item) =>
    new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: item.decimais ?? 0,
      maximumFractionDigits: item.decimais ?? 0,
    }).format(item.valor)

  return (
    <section className="secao numeros" ref={escopo} aria-labelledby="numeros-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              Em números
            </p>
            <h2 id="numeros-titulo" className="titulo-secao" data-revelar style={{ marginTop: '1rem' }}>
              {numeros.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {numeros.descricao}
          </p>
        </header>

        <ul className="numeros-grade">
          {numeros.itens.map((item, i) => (
            <li className="numero" key={item.rotulo} data-revelar>
              <p className="numero-valor tabular">
                {item.prefixo && <em className="numero-afixo">{item.prefixo}</em>}
                <span
                  ref={(el) => {
                    valoresRef.current[i] = el
                  }}
                >
                  {reduzido ? formatar(item) : '0'}
                </span>
                {item.sufixo && <em className="numero-afixo">{item.sufixo}</em>}
              </p>
              <p className="numero-rotulo">{item.rotulo}</p>
              <p className="numero-detalhe">{item.detalhe}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
