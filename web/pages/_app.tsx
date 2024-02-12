import Head from 'next/head'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '@/redux/store'
import LoadingBar from '@/components/global/LoadingBar'
import {
  ThemeProvider,
  DefaultTheme,
  createGlobalStyle,
} from 'styled-components'
import { useEffect } from 'react'
import { devices } from '@/utils/constants'

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html, body, #__next {
    min-height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: system-ui;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    overflow-wrap: anywhere;
    -webkit-appearance:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  html {
    /* scrollbar-gutter: stable; */
  }

  input {
    appearance: none;
  }
`

const theme: DefaultTheme = {
  font: {
    size: {
      primary: '16px',
    },
    family: {
      primary: 'system-ui',
    },
  },
  colors: {
    primary: {
      hex: '#00adbb',
      rgb: {
        r: 0,
        g: 229,
        b: 145,
      },
    },
  },
}

const App = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        ></meta>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <LoadingBar />
          <Component {...pageProps} key={router.route + router.query} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
