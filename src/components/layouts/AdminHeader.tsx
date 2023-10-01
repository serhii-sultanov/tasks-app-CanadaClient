import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { Logout } from '../ui/Logout';
import clsx from 'clsx';
import { AsideNav } from './AsideNav';
import { AsideActions } from './AsideActions';

export const AdminHeader: FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <header className="lg:hidden bg-asidePanel sticky top-0 z-50 py-3">
      <div className="max-w-headerContainer mx-auto px-3.5">
        <div className="flex justify-between items-center">
          <Link href={ROUTE.HOME} className="block">
            <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="flex justify-center items-center border-2 border-opacity-30 py-1 px-3 border-grayStroke-100 rounded-sm"
            >
              <img
                className="w-6 h-6 opacity-80"
                src="/icons/burger-icon.svg"
                alt="menu"
              />
            </button>
            <Logout />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          openMenu ? 'h-[265px] pt-6' : 'h-0 pt-0',
          'w-full mx-auto px-3.5 transform transition-all duration-300 max-w-headerContainer bg-asidePanel relative overflow-hidden',
        )}
      >
        <AsideNav closeMenu={() => setOpenMenu(false)} />
        <AsideActions closeMenu={() => setOpenMenu(false)} />
      </div>
    </header>
  );
};
