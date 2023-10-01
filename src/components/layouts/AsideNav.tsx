import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';

type AsideNavProps = {
  closeMenu?: () => void;
};
export const AsideNav: FC<AsideNavProps> = ({ closeMenu }) => {
  return (
    <nav className="flex flex-col pb-10 border-b border-grayStroke-90 mb-8 max-lg:pb-6 max-lg:mb-6">
      <Link
        onClick={closeMenu}
        className="font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14"
        href={ROUTE.ACTIVITY}
      >
        Activity
      </Link>
      <Link
        onClick={closeMenu}
        className="font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14"
        href={ROUTE.CLIENTS}
      >
        Clients
      </Link>
      <Link
        onClick={closeMenu}
        className="font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14"
        href={ROUTE.OPENTASKS}
      >
        Open Tasks
      </Link>
      <Link
        onClick={closeMenu}
        className="font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14"
        href={ROUTE.USER_ACCOUNT}
      >
        Profile
      </Link>
    </nav>
  );
};
