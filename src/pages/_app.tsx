import type { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '@/components/layouts/MainLayout';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from '@/utils/checkAuth';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <MainLayout>
        <Component {...pageProps} />
        <ToastContainer
          className={'z-50'}
          position="bottom-left"
          autoClose={2000}
        />
      </MainLayout>
    </SessionProvider>
  );
};

export default App;
