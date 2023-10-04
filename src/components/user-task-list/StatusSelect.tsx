import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { getSession, useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from '../ui/Loader';

type StatusSelectProps = {
  userId: string;
  status: string;
  taskId: string;
};

export const StatusSelect: FC<StatusSelectProps> = ({
  status,
  userId,
  taskId,
}) => {
  const session = useSession();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleChangeStatus = async (selectStatus: string) => {
    try {
      setIsLoading(true);
      const session = await getSession();
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/status/${taskId}`,
        { status: selectStatus, userId },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      await queryClient.invalidateQueries({ queryKey: ['client'] });
      setIsLoading(false);
      setDropDown(false);
      toast.success('Status has been changed.');
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div
      className={clsx(
        'text-s14 text-black relative flex items-center max-w-[151px]',
        session.data?.user.role === 'admin' ? ' cursor-pointer' : '',
        'max-[576px]:grow max-[576px]:ml-auto max-[576px]:max-w-full',
      )}
    >
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
        onClick={
          session.data?.user.role === 'admin'
            ? () => setDropDown((prev) => !prev)
            : () => {}
        }
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
        <p className="first-letter:uppercase font-medium text-s14">{status}</p>
      </div>
      <div
        className={clsx(
          dropDown ? 'visible opacity-100' : 'invisible opacity-0',
          'absolute top-full right-0 bg-white border transition-all duration-200 w-[200px]',
        )}
      >
        {isLoading ? (
          <div className="absolute inset-0 w-full h-full bg-grayStroke-100 bg-opacity-70 flex justify-center items-center">
            <Loader />
          </div>
        ) : null}
        <button
          disabled={isLoading}
          className={clsx(
            status === 'waiting for client'
              ? 'bg-mainBLue bg-opacity-20'
              : 'hover:bg-grayStroke-60 hover:bg-opacity-50',
            'w-full cursor-pointer transition-all duration-200 flex items-center gap-3 text-s14 font-medium px-2 py-2',
          )}
          onClick={() => handleChangeStatus('waiting for client')}
        >
          <span className="w-2 h-2 rounded-full bg-mainBLue block" />{' '}
          <p>Waiting for client</p>
        </button>
        <button
          disabled={isLoading}
          className={clsx(
            status === 'needs review'
              ? 'bg-mainOrange bg-opacity-20'
              : 'hover:bg-grayStroke-60 hover:bg-opacity-50',
            'w-full cursor-pointer transition-all duration-200 flex items-center gap-3 text-s14 font-medium px-2 py-2',
          )}
          onClick={() => handleChangeStatus('needs review')}
        >
          <span className="w-2 h-2 rounded-full bg-mainOrange block" />{' '}
          <p>Needs review</p>
        </button>
        <button
          disabled={isLoading}
          className={clsx(
            status === 'completed'
              ? 'bg-mainGreen bg-opacity-20'
              : 'hover:bg-grayStroke-60 hover:bg-opacity-50',
            'w-full cursor-pointer transition-all duration-200 flex items-center gap-3 text-s14 font-medium px-2 py-2',
          )}
          onClick={() => handleChangeStatus('completed')}
        >
          <span className="w-2 h-2 rounded-full bg-mainGreen block" />{' '}
          <p>Completed</p>
        </button>
      </div>
    </div>
  );
};
