import { createRoot } from 'react-dom/client';

import { createGlobalStyle } from 'styled-components';
import { App } from './App';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, img, ul, ol, li, form, label, table, tbody, tfoot, thead, tr, th, td,
  article, aside, footer, header, nav, section {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img, picture, video, canvas, svg {
    display: block;
    width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
    <GlobalStyle />
  </>,
);
