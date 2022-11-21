import 'styles/globals.css';
import 'styles/custom.scss';
import type { AppProps } from 'next/app';
import GeneralLayout from 'components/layout/general/layout';
import { SSRProvider } from 'react-bootstrap';
import { NextPage } from 'next';
import AdminLayout from 'components/layout/admin/layout';
import { SessionProvider, useSession } from 'next-auth/react';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAdmin) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        {Component.isAdminPage ? (
          <Auth>
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          </Auth>
        ) : (
          <GeneralLayout>
            <Component {...pageProps} />
          </GeneralLayout>
        )}
      </SessionProvider>
    </SSRProvider>
  );
}

function Auth({ children }: Props) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>로딩 중입니다...</div>;
  }
  return children;
}

interface Props {
  children: JSX.Element;
}

type NextPageWithAdmin = NextPage & {
  isAdminPage?: boolean;
};

type AppPropsWithAdmin = AppProps & {
  Component: NextPageWithAdmin;
};

export default MyApp;
