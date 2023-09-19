import { FC } from 'react';
import { AsideNav } from './AsideNav';
import { AsideActions } from './AsideActions';
import Link from 'next/link';
import { ROUTE } from '@/utils/routes';
import { useRouter } from 'next/router';

export const Aside: FC = () => {
  const { pathname } = useRouter();

  if (pathname === ROUTE.HOME) {
    return null;
  }

  return (
    <aside className="w-aside h-screen bg-asidePanel p-6 sticky top-0">
      <Link href={ROUTE.HOME} className="mb-24 block">
        <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
      </Link>
      <AsideNav />
      <AsideActions />
    </aside>
  );
};
