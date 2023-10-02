import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Logout } from '../ui/Logout';
import { AsideActions } from './AsideActions';
import { AsideNav } from './AsideNav';
import { AdminHeader } from './AdminHeader';

export const Aside: FC = () => {
  const { pathname } = useRouter();

  if (pathname === ROUTE.HOME) {
    return null;
  }

  return (
    <>
      <aside
        className={clsx(
          'w-aside h-screen bg-asidePanel p-6 sticky top-0 left-0 max-lg:hidden',
        )}
      >
        <div>
          <div className="flex justify-between items-center mb-24">
            <Link href={ROUTE.HOME} className="block">
              <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
            </Link>
            <Logout />
          </div>
          <AsideNav />
          <AsideActions />
        </div>
      </aside>
      <AdminHeader />
    </>
  );
};
