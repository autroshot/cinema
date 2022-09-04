import 'styles/globals.css';
import 'styles/custom.scss';
import type { AppProps } from 'next/app';
import GeneralLayout from 'components/layout/general/layout';
import { SSRProvider } from 'react-bootstrap';
import { NextPage } from 'next';
import AdminLayout from 'components/layout/admin/layout';

function MyApp({ Component, pageProps }: AppPropsWithAdmin) {
  return (
    <SSRProvider>
      {Component.isAdminPage ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <GeneralLayout>
          <Component {...pageProps} />
        </GeneralLayout>
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
