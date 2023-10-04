import clsx from 'clsx';
import { type FC } from 'react';

type IconButtonProps = {
  onClick: () => void;
  imgSrc: string;
  classNameModificator?: string;
  disabled?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
  imgSrc,
  onClick,
  classNameModificator,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex justify-center items-center w-8 min-w-xsMinWidth h-8 rounded-full transition-all duration-300',
        classNameModificator,
      )}
      disabled={disabled}
    >
      <img className="w-5 h-5" src={imgSrc} alt="button" />
    </button>
  );
};
