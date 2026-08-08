import { diferenciais } from '../config/site'
import { Icone } from './Icones'
import { useAnimacao, revelar } from '../lib/animacoes'
import './Diferenciais.css'

export default function Diferenciais() {
  const escopo = useAnimacao(({ escopo }) => {
    // Stagger curto: os cartões entram quase em cascata.
    revelar(escopo, { stagger: 0.07, deslocamento: 28 })
  }, [])

  const moverHalo = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="diferenciais" className="secao" ref={escopo} aria-labelledby="diferenciais-titulo">
      <div className="container">
        <header className="secao-cabecalho">
          <div>
            <p className="eyebrow" data-revelar>
              Diferenciais
            </p>
            <h2
              id="diferenciais-titulo"
              className="titulo-secao"
              data-revelar
              style={{ marginTop: '1rem' }}
            >
              {diferenciais.titulo}
            </h2>
          </div>
          <p className="texto-secao" data-revelar>
            {diferenciais.descricao}
          </p>
        </header>

        <ul className="diferenciais-grade">
          {diferenciais.itens.map((item) => (
            <li
              key={item.titulo}
              className="cartao diferencial"
              data-revelar
              onMouseMove={moverHalo}
            >
              <div className="diferencial-icone">
                <Icone nome={item.icone} tamanho={22} />
              </div>
              <h3 className="diferencial-titulo">{item.titulo}</h3>
              <p className="diferencial-texto">{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
