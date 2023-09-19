import type { AppProps } from 'next/app';
import { FC } from 'react';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '@/components/layouts/MainLayout';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
      <ToastContainer position="bottom-left" autoClose={2000} />
    </MainLayout>
  );
};

export default App;
