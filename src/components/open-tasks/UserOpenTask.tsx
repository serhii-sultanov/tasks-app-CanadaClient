import type { TUser } from '@/types/types';
import { FC } from 'react';
import { OpenTaskListItem } from './OpenTaskListItem';
import Link from 'next/link';
import { ROUTE } from '@/utils/routes';

type TUserOpenTaskProps = {
  user: TUser;
};

export const UserOpenTask: FC<TUserOpenTaskProps> = ({ user }) => {
  return (
    <div className="p-3.5 mb-2 bg-white border-2 border-grayStroke-100 border-opacity-20 last:mb-0 rounded-md shadow-md">
      <Link
        className="text-black max-sm:text-s14 font-medium hover:text-btnBlueHover"
        target="_blank"
        href={`${ROUTE.USER_TASK_LIST}/${user._id}`}
      >
        <span>
          {user.firstName || user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email}
        </span>
        {' - '}
        <span>{user.businessName}</span>
      </Link>
      {user.taskLists.length
        ? user.taskLists.map((taskList) => (
            <OpenTaskListItem key={taskList._id} taskList={taskList} />
          ))
        : null}
    </div>
  );
};
