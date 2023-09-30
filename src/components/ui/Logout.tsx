import { useSignOut } from '@/hooks/useSignOut';
import React, { FC } from 'react';

export const Logout: FC = () => {
  const { handleSignOut } = useSignOut();
  return (
    <button className="text-white block" onClick={handleSignOut}>
      <img className="w-6 h-6" src="/icons/logout-icon.svg" alt="logout" />
    </button>
  );
};
