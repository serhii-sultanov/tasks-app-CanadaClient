import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { AsideActions } from './AsideActions';
import { AsideNav } from './AsideNav';
import { Logout } from '../ui/Logout';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

export const Aside: FC = () => {
  const { pathname } = useRouter();
  const { data } = useSession();

  if (pathname === ROUTE.HOME) {
    return null;
  }

  return (
    <aside
      className={clsx(
        data?.user.role !== 'admin'
          ? 'w-full mb-5 bg-asidePanel py-2.5'
          : 'w-aside h-screen bg-asidePanel p-6 sticky top-0',
      )}
    >
      {data?.user.role === 'admin' ? (
        <>
          <div className="flex justify-between items-center mb-24">
            <Link href={ROUTE.HOME} className="block">
              <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
            </Link>
            <Logout />
          </div>
          <AsideNav />
          <AsideActions />
        </>
      ) : (
        <div className="max-w-[1320px] mx-auto px-2.5 flex justify-between items-center">
          <Link href={ROUTE.HOME} className="block">
            <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
          </Link>
          <Logout />
        </div>
      )}
    </aside>
  );
};
