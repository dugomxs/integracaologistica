import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Segmentos from './components/Segmentos'
import Servicos from './components/Servicos'
import Diferenciais from './components/Diferenciais'
import Processo from './components/Processo'
import Numeros from './components/Numeros'
import Galeria from './components/Galeria'
import Atuacao from './components/Atuacao'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'
import BotaoWhatsApp from './components/BotaoWhatsApp'
import { ScrollTrigger, movimentoReduzido } from './lib/animacoes'

export default function App() {
  useEffect(() => {
    // Marca o documento quando o usuário prefere menos movimento: o CSS usa
    // essa classe para deixar todo o conteúdo visível de imediato.
    if (movimentoReduzido()) {
      document.documentElement.classList.add('sem-animacao')
      return
    }

    // As fontes web mudam a altura dos blocos de texto ao carregar.
    // Recalcular os gatilhos evita reveals disparando no ponto errado.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      {/* tabIndex -1 permite que o "pular para o conteúdo" mova o foco de fato */}
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Segmentos />
        <Servicos />
        <Diferenciais />
        <Processo />
        <Numeros />
        <Galeria />
        <Atuacao />
        <CtaFinal />
      </main>

      <Footer />
      <BotaoWhatsApp />
    </>
  )
}
