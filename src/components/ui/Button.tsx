import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

type ButtonProps = {
  classNameModificator?: string;
  children: string | ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  classNameModificator,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        'w-full font-semibold text-sm16 rounded-[0.25rem] border border-transparent py-1.5 px-4',
        classNameModificator,
      )}
    >
      {children}
    </button>
  );
};
