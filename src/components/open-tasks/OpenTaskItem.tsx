import type { TTask } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';

type OpetTaskItemProps = {
  task: TTask;
};

export const OpenTaskItem: FC<OpetTaskItemProps> = ({ task }) => {
  const formattedDate = format(new Date(task.createdAt), 'MMM d');
  return (
    <Link
      href={`${ROUTE.USER_TASK_LIST}/${task._id}`}
      target="_blank"
      className="relative text-s14 font-medium text-mainBLue flex justify-between items-start mb-1 bg-grayStroke-80 bg-opacity-40 p-2 hover:bg-mainBLue hover:bg-opacity-20 transition-all duration-200 max-sm:text-xs12"
    >
      {task.task_title}
      <span className="text-grayStroke-100 text-xs12 font-semibold block min-w-[50px] text-right">
        {formattedDate}
      </span>
    </Link>
  );
};
