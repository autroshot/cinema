import '../styles/globals.css';
import '../styles/custom.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
