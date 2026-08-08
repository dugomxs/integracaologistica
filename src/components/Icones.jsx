/* =============================================================================
   ÍCONES — SVG inline, traço de 1.5px, herdam currentColor.
   Inline (em vez de arquivos) para evitar requisições extras e permitir
   que o traço acompanhe o estado de hover via CSS.
   ============================================================================= */

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

const desenhos = {
  // Grãos / safra
  graos: (
    <>
      <path d="M12 3c2.2 2 3.3 4.3 3.3 7s-1.1 5-3.3 7c-2.2-2-3.3-4.3-3.3-7S9.8 5 12 3Z" />
      <path d="M12 6v12" />
      <path d="M5.5 9c1.6 1.4 2.4 3.1 2.4 5.1 0 .9-.2 1.8-.5 2.6" />
      <path d="M18.5 9c-1.6 1.4-2.4 3.1-2.4 5.1 0 .9.2 1.8.5 2.6" />
      <path d="M4 21h16" />
    </>
  ),
  // Indústria / planta fabril
  industria: (
    <>
      <path d="M3 21V10l5 3.5V10l5 3.5V10l5 3.5V21" />
      <path d="M18 10V4.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V10" />
      <path d="M2 21h20" />
      <path d="M7.5 17.5h1.5M11.5 17.5H13M15.5 17.5H17" />
    </>
  ),
  // Pontualidade
  relogio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 1.9" />
    </>
  ),
  // Rastreabilidade
  radar: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 12 17 7" />
      <path d="M16.2 16.2a6 6 0 1 0-8.4-8.4" />
      <path d="M19 19A10 10 0 1 0 5 4.9" />
    </>
  ),
  // Frota
  caminhao: (
    <>
      <path d="M2 16V6.5a.5.5 0 0 1 .5-.5H14v10" />
      <path d="M14 9h3.8a1 1 0 0 1 .8.4L21.8 14a1 1 0 0 1 .2.6V16" />
      <circle cx="7" cy="17.5" r="2" />
      <circle cx="17.5" cy="17.5" r="2" />
      <path d="M9 17.5h6.5M2 16h3" />
    </>
  ),
  // Cobertura
  bussola: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
    </>
  ),
  // Atendimento
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h2.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H5a1 1 0 0 1-1-1v-4Z" />
      <path d="M20 14h-2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5H19a1 1 0 0 0 1-1v-4Z" />
      <path d="M17 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
  // Segurança
  escudo: (
    <>
      <path d="M12 2.5 4.5 5.6V12c0 4.3 3.1 8 7.5 9.5 4.4-1.5 7.5-5.2 7.5-9.5V5.6L12 2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  // Equipe / parceria de longo prazo
  equipe: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20v-1.2c0-2.2 2.7-3.8 6-3.8s6 1.6 6 3.8V20" />
      <path d="M16.2 5.3a3.2 3.2 0 0 1 0 5.9" />
      <path d="M18 15.4c1.8.5 3 1.7 3 3.4V20" />
    </>
  ),
  // Setas e navegação
  seta: <path d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5" />,
  setaBaixo: <path d="M12 5v13m0 0 5.5-5.5M12 18l-5.5-5.5" />,
  check: <path d="m4.5 12.5 4.5 4.5L19.5 6.5" />,
  local: (
    <>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  email: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </>
  ),
}

/** Ícone genérico do sistema. */
export function Icone({ nome, tamanho = 24, ...props }) {
  const desenho = desenhos[nome]
  if (!desenho) return null
  return (
    <svg {...base} width={tamanho} height={tamanho} {...props}>
      {desenho}
    </svg>
  )
}

/* --- Ícones de marca (preenchidos, não seguem o traço padrão) --- */

export function IconeWhatsApp({ tamanho = 24, ...props }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91a9.85 9.85 0 0 0-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.23-8.23a8.18 8.18 0 0 1 5.81 2.42 8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.7 8.21-8.23 8.21Z" />
    </svg>
  )
}

export function IconeInstagram({ tamanho = 24, ...props }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
