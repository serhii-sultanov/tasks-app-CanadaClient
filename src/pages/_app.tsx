import { MainLayout } from '@/components/layouts/MainLayout';
import '@/styles/globals.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { FC, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
