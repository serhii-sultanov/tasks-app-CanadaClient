import { FC, ReactNode } from 'react';
import clsx from 'clsx';

type ActionButtonProps = {
  type: 'delete' | 'edit';
  onClick: () => void;
  children: ReactNode;
};

export const ActionButton: FC<ActionButtonProps> = ({
  type,
  onClick,
  children,
}) => {
  const buttonClass = clsx(
    'p-2 font-medium outline-none border-none rounded-[0.25rem] px-1 text-sm hover:bg-actionBtnHover min-w-[140px] text-left',
    {
      'text-btnRed hover:text-btnRedHover': type === 'delete',
      'text-btnBlue hover:text-btnBlueHover': type === 'edit',
    },
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};
