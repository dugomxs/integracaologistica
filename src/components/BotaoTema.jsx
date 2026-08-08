import { useEffect, useState } from 'react'
import './BotaoTema.css'

const CHAVE = 'integracao-tema'
const CLARO = 'claro'
const ESCURO = 'escuro'

/* Cor da barra de endereço do navegador em cada tema.
   Precisa bater com --fundo do global.css. */
const COR_BARRA = { [CLARO]: '#ffffff', [ESCURO]: '#0a0a0a' }

/**
 * Lê o tema já aplicado ao <html>. O script inline do index.html roda antes
 * do React e define o atributo, então aqui só reaproveitamos o resultado —
 * é isso que evita o flash de tema errado no primeiro paint.
 */
function temaInicial() {
  if (typeof document === 'undefined') return CLARO
  return document.documentElement.getAttribute('data-tema') === ESCURO ? ESCURO : CLARO
}

export default function BotaoTema({ className = '' }) {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    const raiz = document.documentElement

    // O claro é o padrão do :root, então basta remover o atributo.
    if (tema === ESCURO) raiz.setAttribute('data-tema', ESCURO)
    else raiz.removeAttribute('data-tema')

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COR_BARRA[tema])

    // Modo privado/anônimo pode bloquear o localStorage: a troca continua
    // funcionando na sessão, só não persiste.
    try {
      localStorage.setItem(CHAVE, tema)
    } catch {
      /* sem persistência — segue o jogo */
    }
  }, [tema])

  const escuro = tema === ESCURO

  return (
    <button
      type="button"
      className={`botao-tema ${className}`}
      onClick={() => setTema(escuro ? CLARO : ESCURO)}
      aria-label={escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      title={escuro ? 'Tema claro' : 'Tema escuro'}
      aria-pressed={escuro}
    >
      {/* Sol e lua empilhados: um gira para dentro enquanto o outro sai.
          Só opacity e transform — nada que force layout. */}
      <span className="tema-palco" aria-hidden="true">
        <svg
          className="tema-icone tema-sol"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          focusable="false"
        >
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6" />
          <path d="M18.6 5.4 17 7M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4" />
        </svg>

        <svg
          className="tema-icone tema-lua"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          focusable="false"
        >
          <path d="M20.2 14.7A8.6 8.6 0 0 1 9.3 3.8a7.9 7.9 0 1 0 10.9 10.9Z" />
        </svg>
      </span>
    </button>
  )
}
