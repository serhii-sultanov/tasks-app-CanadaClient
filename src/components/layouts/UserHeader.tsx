import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';
import { Logout } from '../ui/Logout';
import { useSession } from 'next-auth/react';

export const UserHeader: FC = () => {
  const session = useSession();

  return (
    <header className="w-full bg-asidePanel sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-3.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href={ROUTE.HOME} className="block">
              <img className="w-9 h-9" src="/icons/logo.svg" alt="logo" />
            </Link>
            <Link
              href={`${ROUTE.USER_TASK_LIST}/${session.data?.user.id}`}
              className="block text-s14 opacity-80 hover:opacity-100 transition-all duration-200"
            >
              Home
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Logout />
            <Link
              className="font-medium text-s14 w-9 h-9 rounded-full text-white flex justify-center items-center opacity-90 hover:opacity-100 transition-all duration-200"
              href={ROUTE.USER_ACCOUNT}
              style={{
                backgroundColor: session.data?.user.clientBackground,
              }}
            >
              {session.data?.user.firstName || session.data?.user.lastName
                ? `${session.data?.user.firstName.slice(
                    0,
                    1,
                  )}${session.data?.user.lastName.slice(0, 1)}`
                : session.data?.user.email.slice(0, 2)}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
