/* =============================================================================
   CLIENTES
   -----------------------------------------------------------------------------
   Logos extraídos da apresentação institucional da empresa
   (documentos/apresentacao-institucional.pdf, página "Principais Clientes").

   PARA ADICIONAR OU REMOVER UM CLIENTE
   1. Coloque o PNG com fundo transparente em src/assets/clientes/
   2. Importe e acrescente ao array abaixo

   Os logos são exibidos em tom neutro e ganham cor ao passar o mouse — é o
   que permite marcas de cores muito diferentes conviverem na mesma faixa,
   nos dois temas.
   ============================================================================= */

import araguaia from '../assets/clientes/araguaia.png'
import vig from '../assets/clientes/vig-sementes.png'
import baia from '../assets/clientes/baia-nutricao-animal.png'
import fertigreen from '../assets/clientes/fertigreen.png'
import graoDeOuro from '../assets/clientes/grao-de-ouro.png'
import brg from '../assets/clientes/brg-geradores.png'
import canassa from '../assets/clientes/grupo-canassa.png'
import ouroVerde from '../assets/clientes/grupo-ouro-verde.png'
import aSementeira from '../assets/clientes/a-sementeira.png'
import veneza from '../assets/clientes/sementes-veneza.png'
import fenix from '../assets/clientes/fenix-gerenciamento-agricola.png'
import chnutri from '../assets/clientes/chnutri.png'

export const clientes = {
  eyebrow: 'Principais clientes',
  titulo: 'Quem confia a carga à Integração',
  descricao:
    'Empresas do agronegócio e da indústria que já contam com a nossa operação.',
  logos: [
    { nome: 'Araguaia', src: araguaia },
    { nome: 'VIG Sementes', src: vig },
    { nome: 'Baia Nutrição Animal', src: baia },
    { nome: 'FertiGreen', src: fertigreen },
    { nome: 'Grão de Ouro', src: graoDeOuro },
    { nome: 'BRG Geradores', src: brg },
    { nome: 'Grupo Canassa', src: canassa },
    { nome: 'Grupo Ouro Verde', src: ouroVerde },
    { nome: 'A Sementeira', src: aSementeira },
    { nome: 'Sementes Veneza', src: veneza },
    { nome: 'Fênix Gerenciamento Agrícola', src: fenix },
    { nome: 'CHNutri Nutrição Animal', src: chnutri },
  ],
}
