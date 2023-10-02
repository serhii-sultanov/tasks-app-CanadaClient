import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';
import { Logout } from '../ui/Logout';

export const UserHeader: FC = () => {
  return (
    <header className="w-full bg-asidePanel sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-3.5">
        <div className="flex justify-between items-center">
          <Link href={ROUTE.USER_TASK_LIST} className="block">
            <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
          </Link>
          <div className="flex items-center gap-3">
            <Logout />
            <Link
              className="font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14"
              href={ROUTE.USER_ACCOUNT}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
