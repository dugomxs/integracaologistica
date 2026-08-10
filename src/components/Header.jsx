import { useEffect, useState } from 'react'
import { empresa, navegacao, linkWhatsApp } from '../config/site'
import Marca from './Marca'
import BotaoTema from './BotaoTema'
import { Icone } from './Icones'
import './Header.css'

export default function Header() {
  const [compacto, setCompacto] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const [ativo, setAtivo] = useState('')

  // Encolhe o header e aplica o fundo translúcido depois dos primeiros pixels de scroll.
  useEffect(() => {
    const aoRolar = () => setCompacto(window.scrollY > 40)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // Marca no menu a seção visível. IntersectionObserver é mais barato que
  // recalcular posições a cada evento de scroll.
  useEffect(() => {
    const secoes = navegacao
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    if (!secoes.length) return

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setAtivo(entrada.target.id)
        })
      },
      // Faixa estreita no meio da tela: só uma seção é "ativa" por vez.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    secoes.forEach((secao) => observador.observe(secao))
    return () => observador.disconnect()
  }, [])

  // Trava o scroll do corpo com o menu mobile aberto e permite fechar com Esc.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
    const aoTeclar = (e) => e.key === 'Escape' && setMenuAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', aoTeclar)
    }
  }, [menuAberto])

  return (
    <header className={`cabecalho ${compacto ? 'compacto' : ''}`}>
      <div className="cabecalho-interno container">
        <Marca
          rotulo={`${empresa.nomeCompleto} — ir para o início`}
          onClick={() => setMenuAberto(false)}
        />

        <nav className="menu-desktop" aria-label="Navegação principal">
          {navegacao.map(({ id, rotulo }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`menu-link ${ativo === id ? 'ativo' : ''}`}
              aria-current={ativo === id ? 'true' : undefined}
            >
              {rotulo}
            </a>
          ))}
        </nav>

        <div className="cabecalho-acoes">
          <BotaoTema />

          <a
            className="btn btn-sm cta-header"
            href={linkWhatsApp('menu')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar cotação de frete pelo WhatsApp"
          >
            Solicitar Cotação
            <Icone nome="seta" tamanho={16} className="seta" />
          </a>

          <button
            type="button"
            className={`botao-menu ${menuAberto ? 'aberto' : ''}`}
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div
        id="menu-mobile"
        className={`menu-mobile ${menuAberto ? 'aberto' : ''}`}
        hidden={!menuAberto}
      >
        <nav aria-label="Navegação mobile">
          {navegacao.map(({ id, rotulo }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuAberto(false)}
              style={{ '--i': i }}
            >
              <span className="menu-mobile-indice tabular">
                {String(i + 1).padStart(2, '0')}
              </span>
              {rotulo}
            </a>
          ))}
        </nav>
        <a
          className="btn menu-mobile-cta"
          href={linkWhatsApp('menu mobile')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuAberto(false)}
        >
          Solicitar Cotação
          <Icone nome="seta" tamanho={18} className="seta" />
        </a>
      </div>
    </header>
  )
}
