# MiniBlog (Vite + React)

Projeto configurado com Vite e React (plugin SWC).

## Comandos

- `npm run dev` — inicia o servidor de desenvolvimento em `http://localhost:3000/`.
- `npm run build` — gera o build de produção em `dist/`.
- `npm run preview` — serve localmente o conteúdo de `dist/` para teste.

## Observações

- A entrada da aplicação é `index.html` na raiz do projeto `miniblog/`.
- A pasta `public/` foi removida por ser legado do CRA. Se precisar de arquivos estáticos, crie uma pasta `public/` e referencie-os como `/arquivo.ext`.
- Para evitar cópias duplicadas de React, o `vite.config.js` inclui `resolve.dedupe` para `react` e `react-dom`.

## Estrutura

- `src/index.jsx` — ponto de entrada do app.
- `src/App.jsx` — rotas e layout base.
- `src/pages/*` — páginas da aplicação.
- `src/components/*` — componentes compartilhados.

## Requisitos

- Node.js 18+ recomendado.
- Dependências instaladas no diretório `miniblog`.
