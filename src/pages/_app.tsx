import { MainLayout } from '@/components/layouts/MainLayout';
import '@/styles/globals.css';
import { checkAuth } from '@/utils/checkAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const client = new QueryClient();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <MainLayout>
          <Component {...pageProps} />
          <ToastContainer
            className={'z-50'}
            position="bottom-left"
            autoClose={2000}
          />
        </MainLayout>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
