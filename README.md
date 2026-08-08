# Transportadora Integração Logística — Site institucional

Site institucional single-page em **Vite + React**, com build 100% estático.
Sem backend, sem API, sem banco de dados: o `dist/` gerado roda em qualquer
hospedagem de arquivos.

**Slogan:** Entregando Resultados
**Objetivo:** gerar cotações de frete via WhatsApp.

---

## Rodando o projeto

```bash
npm install     # instala as dependências
npm run dev     # ambiente de desenvolvimento em http://localhost:5173
npm run build   # gera a pasta dist/ pronta para publicação
npm run preview # serve a pasta dist/ localmente para conferência
```

Requer Node.js 18 ou superior.

---

## O que editar (leia isto primeiro)

Quase tudo que o cliente precisa mudar está em **um único arquivo**:

### `src/config/site.js`

| Bloco          | O que controla                                              |
| -------------- | ----------------------------------------------------------- |
| `empresa`      | Nome, CNPJ, endereço, e-mail, cidade/UF                     |
| `whatsapp`     | **Número do WhatsApp** e mensagem pré-preenchida do chat     |
| `redes`        | Instagram                                                    |
| `navegacao`    | Itens do menu (âncoras)                                      |
| `hero`         | Título, subtítulo, botões e selos da primeira dobra          |
| `segmentos`    | Blocos de Agronegócio e Indústrias                           |
| `diferenciais` | Cards de diferenciais                                        |
| `processo`     | Passo a passo "Como funciona"                                |
| `numeros`      | Estatísticas dos contadores animados                         |
| `atuacao`      | **Filiais** (cidade, UF, tipo e coordenadas) e corredores    |
| `ctaFinal`     | Chamada final                                                |

Os pontos que exigem dados reais estão marcados com `TODO CLIENTE`.

### Configurar o WhatsApp

O número em uso é **(62) 99811-5649**, definido em `src/config/site.js`:

```js
const WHATSAPP_NUMERO = '5562998115649' // DDI + DDD + número, só dígitos
```

Para trocar, altere essa constante **e** `whatsapp.numeroFormatado` (o texto exibido
no rodapé e no CTA final). Os dois precisam bater — o primeiro monta o link, o segundo
é só o que o visitante lê.

Não esqueça de `"telephone"` no JSON-LD do `index.html`, que usa o formato
internacional: `+5562998115649`.

Todos os botões do site usam a função `linkWhatsApp()`, que já monta o link
`wa.me` com a mensagem pré-preenchida e identifica de qual seção veio o clique.

### Cores, temas e tipografia

O site abre no **tema claro** e traz um botão no header para alternar com o escuro.
A escolha fica salva no `localStorage` e vale para as próximas visitas.

Os tokens ficam em `src/styles/global.css`:

- **`:root`** — paleta do tema claro (padrão) + tipografia, espaçamentos e curvas de animação.
- **`[data-tema="escuro"]`** — redefine **apenas as cores**. Nenhum componente sabe qual
  tema está ativo; todos consomem os mesmos nomes de variável.

Para mudar uma cor, edite os dois blocos. Regra importante: **não use cor literal**
(`#fff`, `rgba(255,255,255,…)`) fora desses blocos, senão ela não acompanha a troca de tema.
Cores fixas nos dois temas — texto sobre o botão azul e sobre o verde do WhatsApp — usam `--sobre-cor`.

O `index.html` traz um script inline no topo do `<head>` que aplica o tema salvo
**antes do primeiro paint**. Sem ele, quem escolheu o escuro veria um flash branco ao abrir.
Se mudar o nome da chave (`integracao-tema`), altere no script **e** em
`src/components/BotaoTema.jsx` — os dois precisam bater.

#### Abrir sempre no escuro

Mova a paleta escura para o `:root` e a clara para `[data-tema="claro"]`, e ajuste o
script inline do `index.html` para testar `=== 'claro'`.

### `src/config/fotos.js` — as imagens

As fotos reais da operação são importadas aqui e usadas em três lugares:
cabeçalho dos cartões de segmento, galeria "Frota em operação" e faixa do CTA final.

Para trocar uma foto:

1. Coloque o arquivo em `src/assets/fotos/`
2. Ajuste o `import` correspondente em `src/config/fotos.js`
3. **Atualize o `alt`** — é lido por leitores de tela e conta para o SEO

Adicionar ou remover itens do array `galeria` reflete direto na seção; a grade
se reorganiza sozinha. A primeira foto do array é o destaque (ocupa 2×2 no desktop),
então coloque a melhor imagem na primeira posição.

As imagens ficam em `src/assets/` (e não em `public/`) de propósito: assim o Vite
gera nomes com hash no build, e o navegador nunca serve uma versão velha do cache.

**Tamanhos usados:** segmentos ~1000px · galeria ~800px · CTA ~1400px, todas JPEG
qualidade 55–72. Os originais em alta ficam em `fotos-originais/`, fora do build.

### O mapa

O contorno do Brasil e as divisas estaduais vêm das **malhas oficiais do IBGE**,
não são desenhados à mão. `src/lib/brasil.js` é um arquivo **gerado** — não edite.

Para regenerar (só é necessário se quiser outra resolução):

```bash
node scripts/gerar-mapa.mjs
```

O script baixa a malha do IBGE, simplifica por Douglas-Peucker, projeta e grava
o módulo. Como o resultado fica versionado, **o build não depende de rede**.

As tolerâncias de simplificação estão no topo do script. Hoje o custo é de
~27 kB de path (7 kB do contorno + 20 kB das divisas).

### Adicionar ou remover uma filial

Em `atuacao.filiais` (`src/config/site.js`), acrescente o objeto com **`lat` e `lon`
da cidade**. O pino aparece no mapa sozinho — a mesma projeção que gera o contorno
do Brasil posiciona os pontos, então não há coordenada de tela para ajustar à mão.

```js
{ cidade: 'Sinop', uf: 'MT', estado: 'Mato Grosso', lat: -11.86, lon: -55.50 }
```

A seção lista apenas cidade e estado — de propósito. Qualquer classificação
(tipo de base, papel na operação, volume) precisa vir de quem conhece a operação,
não ser inferida a partir da localização.

Ao mexer nas filiais, atualize também o bloco JSON-LD do `index.html`
(`areaServed` e `location`), que lista as mesmas cidades para busca local.

### Itens pendentes fora do `site.js`

- **`index.html`** — meta tags, URL canônica e o JSON-LD de negócio local
  (telefone, endereço e CNPJ reais). Mantenha em sincronia com o `site.js`.
- **`public/og-image.jpg`** — imagem de compartilhamento em redes sociais
  (1200×630). Já criada a partir da foto do entardecer; troque se quiser outra.
- **`public/favicon.svg`** — já criado com a rosa dos ventos da marca.

---

## Estrutura

```
src/
├── config/site.js          ← textos, WhatsApp, dados da empresa
scripts/gerar-mapa.mjs      ← baixa e processa a malha do IBGE
├── config/fotos.js         ← imports e alt das fotos da operação
├── assets/fotos/           ← imagens otimizadas (versionadas pelo Vite)
├── lib/animacoes.js        ← camada GSAP (reveal, parallax, rota, contadores)
├── lib/brasil.js           ← GERADO: malha do IBGE projetada (veja scripts/)
├── styles/global.css       ← tokens, reset, botões, cartões, acessibilidade
├── components/
│   ├── Header.jsx          ← header fixo + menu mobile + troca de tema
│   ├── Hero.jsx            ← primeira dobra
│   ├── Segmentos.jsx       ← Agronegócio e Indústrias
│   ├── Diferenciais.jsx    ← grade de cards
│   ├── Processo.jsx        ← passo a passo + rota desenhada no scroll
│   ├── Numeros.jsx         ← contadores animados
│   ├── Galeria.jsx         ← fotos reais da frota em operação
│   ├── Atuacao.jsx         ← diagrama de cobertura
│   ├── CtaFinal.jsx        ← chamada final
│   ├── Footer.jsx          ← contato, redes, CNPJ
│   ├── BotaoWhatsApp.jsx   ← CTA flutuante
│   ├── BotaoTema.jsx       ← alterna claro/escuro e persiste a escolha
│   ├── RosaDosVentos.jsx   ← motif da marca (SVG)
│   └── Icones.jsx          ← ícones SVG inline
├── App.jsx
└── main.jsx
```

Cada componente tem seu `.css` ao lado, importado pelo próprio arquivo.

---

## Animações

Tudo é GSAP + ScrollTrigger, centralizado em `src/lib/animacoes.js`:

- `useAnimacao()` — hook que roda os tweens dentro de um `gsap.context`,
  com limpeza automática. **Não anima nada se o usuário tiver
  `prefers-reduced-motion: reduce` ativado.**
- `revelar()` — fade + slide com stagger nos elementos `[data-revelar]`.
- `parallax()` — deslocamento suave no hero.
- `desenharRota()` — desenha paths SVG via `stroke-dashoffset` conforme o scroll.
- `contar()` — contadores numéricos formatados em pt-BR.

Só são animadas `transform` e `opacity`, para manter tudo na GPU.

---

## Deploy

O build é estático. Publique a pasta `dist/`.

### Netlify

**Pelo painel (arrastar e soltar):**
1. Rode `npm run build`.
2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop) e arraste a pasta `dist/`.

**Conectado ao Git:**
1. Novo site → importe o repositório.
2. Build command: `npm run build`
3. Publish directory: `dist`

O arquivo `netlify.toml` incluído já traz essas configurações.

### Cloudflare Pages

1. Workers & Pages → Create → Pages → conecte o repositório.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Build output directory: `dist`

### Hospedagem compartilhada / cPanel / S3

Rode `npm run build` e envie **o conteúdo** da pasta `dist/` para a raiz pública
(`public_html`, `www` ou o bucket). Não é necessária nenhuma configuração de
servidor — o site é uma página única com navegação por âncoras.

> O `vite.config.js` usa `base: './'`, então o site também funciona se for
> publicado dentro de uma subpasta (ex.: `seudominio.com.br/site/`).

---

## Checklist antes de publicar

- [x] Número do WhatsApp real em `src/config/site.js` — (62) 99811-5649
- [ ] CNPJ, endereço e e-mail reais
- [ ] Números da seção de estatísticas conferidos
- [ ] Domínio final na tag `<link rel="canonical">` do `index.html`
- [ ] Telefone e endereço atualizados no JSON-LD do `index.html`
- [ ] Conferir se todas as fotos são da própria empresa (direito de uso)
- [ ] Testado em celular, tablet e desktop
- [ ] Testado nos dois temas (claro e escuro)
