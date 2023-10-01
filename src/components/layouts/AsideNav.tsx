import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';

export const AsideNav: FC = () => {
  return (
    <nav className="flex flex-col pb-10 border-b border-grayStroke-90 mb-8">
      <Link
        className="font-medium pr-2 py-2 text-sm16 text-lightMain"
        href={ROUTE.OPENTASKS}
      >
        Open Tasks
      </Link>
      <Link
        className="font-medium pr-2 py-2 text-sm16 text-lightMain"
        href={ROUTE.ACTIVITY}
      >
        Activity
      </Link>
      <Link
        className="font-medium pr-2 py-2 text-sm16 text-lightMain"
        href={ROUTE.CLIENTS}
      >
        Clients
      </Link>
    </nav>
  );
};
