import type { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Aside } from './Aside';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ROUTE } from '@/utils/routes';
import { useSession } from 'next-auth/react';
import { UserHeader } from './UserHeader';

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
        'max-lg:block',
        data?.user.role !== 'admin' ? '' : 'flex items-start',
      )}
    >
      {data?.user.role === 'admin' ? <Aside /> : null}
      {data?.user.role === 'client' ? <UserHeader /> : null}
      <main
        className={clsx(
          'flex-1 relative',
          pathname === ROUTE.HOME
            ? 'max-w-loginContainer mx-auto px-3.5'
            : null,
          'max-w-container mx-auto px-3.5',
        )}
      >
        {children}
      </main>
    </div>
  );
};
