import { empresa, whatsapp, redes, navegacao, segmentos, linkWhatsApp } from '../config/site'
import RosaDosVentos from './RosaDosVentos'
import { Icone, IconeWhatsApp, IconeInstagram } from './Icones'
import './Footer.css'

export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-topo">
          {/* Marca + slogan */}
          <div className="rodape-marca">
            <a href="#topo" className="marca" aria-label={`${empresa.nomeCompleto} — voltar ao início`}>
              <RosaDosVentos tamanho={38} detalhado={false} className="marca-rosa" />
              <span className="marca-texto">
                <strong>Integração</strong>
                <span>Logística</span>
              </span>
            </a>
            <p className="rodape-slogan">{empresa.slogan}</p>
            <p className="rodape-tagline">{empresa.tagline}</p>
            <p className="rodape-descricao">
              Transporte rodoviário de cargas para o agronegócio e para a indústria. Matriz em{' '}
              {empresa.cidade}-{empresa.uf}, com filiais em quatro estados e atendimento em todo o
              território nacional.
            </p>
          </div>

          {/* Navegação */}
          <nav className="rodape-coluna" aria-label="Navegação do rodapé">
            <h2 className="rodape-titulo">Navegação</h2>
            <ul>
              {navegacao.map(({ id, rotulo }) => (
                <li key={id}>
                  <a href={`#${id}`}>{rotulo}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Segmentos */}
          <div className="rodape-coluna">
            <h2 className="rodape-titulo">Segmentos</h2>
            <ul>
              {segmentos.itens.map((item) => (
                <li key={item.id}>
                  <a
                    href={linkWhatsApp(`rodapé ${item.nome}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Frete para {item.nome.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="rodape-coluna">
            <h2 className="rodape-titulo">Contato</h2>
            <ul className="rodape-contato">
              <li>
                <a
                  href={linkWhatsApp('rodapé')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Falar no WhatsApp ${whatsapp.numeroFormatado}`}
                >
                  <IconeWhatsApp tamanho={17} />
                  <span className="tabular">{whatsapp.numeroFormatado}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${empresa.email}`}>
                  <Icone nome="email" tamanho={17} />
                  <span>{empresa.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={redes.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${redes.instagram.handle}`}
                >
                  <IconeInstagram tamanho={17} />
                  <span>{redes.instagram.handle}</span>
                </a>
              </li>
              <li className="rodape-endereco">
                <Icone nome="local" tamanho={17} />
                <span>
                  {empresa.endereco}
                  <br />
                  {empresa.cidade} — {empresa.uf}, {empresa.cep}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rodape-base">
          <p>
            © {ano} {empresa.nomeCompleto}. Todos os direitos reservados.
          </p>
          <p className="tabular">CNPJ {empresa.cnpj}</p>
        </div>
      </div>
    </footer>
  )
}
