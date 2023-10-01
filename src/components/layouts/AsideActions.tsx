import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';

type AsideActionsProps = {
  closeMenu?: () => void;
};
export const AsideActions: FC<AsideActionsProps> = ({ closeMenu }) => {
  return (
    <div className="relative">
      <Link
        onClick={closeMenu}
        href={ROUTE.ADD_NEW_TASK}
        className="w-full font-semibold text-sm16 rounded-[0.25rem] border border-transparent py-1.5 px-4 bg-mainBlue block text-white hover:bg-blueHover hover:border-blueBorderHoverhover:shadow-[0px_0px_0px_0.2rem_rgba(38,143,255,0.5)] transition-all duration-200 text-center"
      >
        Add New Task
      </Link>
    </div>
  );
};
