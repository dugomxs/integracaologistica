import logo from '../assets/logo.png'
import './Marca.css'

/**
 * Logotipo oficial da empresa, usado no header e no rodapé.
 *
 * A arte já traz o nome escrito, então não acompanha texto ao lado — repetir
 * "Integração Logística" em HTML duplicaria a leitura. O nome acessível vem
 * do aria-label do link; por isso a imagem é decorativa (alt vazio).
 *
 * O mesmo arquivo serve aos dois temas: as letras têm contorno branco e o
 * miolo escuro, então o logo se sustenta tanto sobre fundo claro quanto escuro.
 */
export default function Marca({ rotulo, onClick, className = '' }) {
  return (
    <a href="#topo" className={`marca ${className}`.trim()} aria-label={rotulo} onClick={onClick}>
      <img
        src={logo}
        alt=""
        className="marca-logo"
        width="560"
        height="197"
        decoding="async"
      />
    </a>
  )
}
