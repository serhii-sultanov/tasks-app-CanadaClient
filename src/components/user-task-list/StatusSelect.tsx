import clsx from 'clsx';
import { FC, useState } from 'react';

type StatusSelectProps = {
  userId: string;
  status: string;
};

export const StatusSelect: FC<StatusSelectProps> = ({ status, userId }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="text-s14 text-black relative flex items-center cursor-pointer max-w-[151px]">
      <div
        className={clsx(
          'flex items-center gap-2 min-h-[30px] px-2.5 bg-opacity-20 ',
          status === 'waiting for client'
            ? 'bg-mainBLue'
            : status === 'needs review'
            ? 'bg-mainOrange'
            : status === 'completed'
            ? 'bg-mainGreen'
            : null,
        )}
        onClick={() => setDropDown((prev) => !prev)}
      >
        <div
          className={clsx(
            'w-2 h-2 rounded-full',
            status === 'waiting for client'
              ? 'bg-mainBLue'
              : status === 'needs review'
              ? 'bg-mainOrange'
              : status === 'completed'
              ? 'bg-mainGreen'
              : null,
          )}
        />
        <p className="first-letter:uppercase font-medium text-s14">
          {currentStatus}
        </p>
      </div>
      <div
        className={clsx(
          dropDown ? 'visible opacity-100' : 'invisible opacity-0',
          'absolute top-full right-0 bg-white border transition-all duration-200 w-[200px]',
        )}
      >
        <button
          className={clsx(
            status === 'waiting for client'
              ? 'bg-mainBLue bg-opacity-20'
              : 'hover:bg-grayStroke-60 hover:bg-opacity-50',
            'w-full cursor-pointer transition-all duration-200 flex items-center gap-3 text-s14 font-medium px-2 py-2',
          )}
        >
          <span className="w-2 h-2 rounded-full bg-mainBLue block" />{' '}
          <p>Waiting for client</p>
        </button>
        <button
          className={clsx(
            status === 'needs review'
              ? 'bg-mainOrange bg-opacity-20'
              : 'hover:bg-grayStroke-60 hover:bg-opacity-50',
            'w-full cursor-pointer transition-all duration-200 flex items-center gap-3 text-s14 font-medium px-2 py-2',
          )}
        >
          <span className="w-2 h-2 rounded-full bg-mainOrange block" />{' '}
          <p>Needs review</p>
        </button>
        <button
          className={clsx(
            status === 'completed'
              ? 'bg-mainGreen bg-opacity-20'
              : 'hover:bg-grayStroke-60 hover:bg-opacity-50',
            'w-full cursor-pointer transition-all duration-200 flex items-center gap-3 text-s14 font-medium px-2 py-2',
          )}
        >
          <span className="w-2 h-2 rounded-full bg-mainGreen block" />{' '}
          <p>Completed</p>
        </button>
      </div>
    </div>
  );
};
