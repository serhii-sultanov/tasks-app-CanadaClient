import type { AppProps } from 'next/app';
import { FC } from 'react';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '@/components/layouts/MainLayout';
import { SessionProvider } from 'next-auth/react';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <MainLayout>
        <Component {...pageProps} />
        <ToastContainer position="bottom-left" autoClose={2000} />
      </MainLayout>
    </SessionProvider>
  );
};

export default App;
