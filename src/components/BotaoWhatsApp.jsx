import { useEffect, useState } from 'react'
import { linkWhatsApp } from '../config/site'
import { IconeWhatsApp } from './Icones'
import './BotaoWhatsApp.css'

/**
 * CTA flutuante fixo. Aparece após o usuário sair do hero, para não competir
 * com o botão principal da primeira dobra.
 */
export default function BotaoWhatsApp() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.6)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <a
      className={`flutuante ${visivel ? 'visivel' : ''}`}
      href={linkWhatsApp('botão flutuante')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar cotação de frete pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
    >
      <span className="flutuante-pulso" aria-hidden="true" />
      <IconeWhatsApp tamanho={26} />
      <span className="flutuante-rotulo">Solicite uma cotação</span>
    </a>
  )
}
