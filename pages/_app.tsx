import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { createClient, Provider } from 'urql';
import { Provider as ReactProvider } from 'react-redux';
import { store } from '../app/store';

const GlobalStyle = createGlobalStyle`
  body,div,p,ul,li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  body{
    background:#FEFBF3
  }
`;

const client = createClient({
  url: 'https://reasonapps-gql-api.vercel.app/api/graphql',
});

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider value={client}>
          <ReactProvider store={store}>
            <Component {...pageProps} />
          </ReactProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
