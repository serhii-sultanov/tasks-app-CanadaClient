import type { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Aside } from './Aside';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ROUTE } from '@/utils/routes';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  const { data } = useSession();

  return (
    <div
      className={clsx(
        inter.className,
        'bg-grayStroke-40',
        data?.user.role === 'admin' ? 'flex' : null,
      )}
    >
      <Aside />
      <main
        className={clsx(
          'overflow-hidden flex-1',
          pathname === ROUTE.HOME
            ? 'max-w-loginContainer mx-auto px-3.5'
            : null,
          data?.user.role !== 'admin' ? 'max-w-container mx-auto px-3.5' : null,
        )}
      >
        {children}
      </main>
    </div>
  );
};
