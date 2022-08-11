import 'styles/globals.css';
import 'styles/custom.scss';
import type { AppProps } from 'next/app';
import Layout from 'components/layout';
import { SSRProvider } from 'react-bootstrap';
import { NextPage } from 'next';
import AdminLayout from 'components/adminLayout';

function MyApp({ Component, pageProps }: AppPropsWithAdmin) {
  return (
    <SSRProvider>
      {Component.isAdminPage ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SSRProvider>
  );
}

type NextPageWithAdmin = NextPage & {
  isAdminPage?: boolean;
};

type AppPropsWithAdmin = AppProps & {
  Component: NextPageWithAdmin;
};

export default MyApp;
