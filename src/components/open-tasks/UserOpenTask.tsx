import type { TUser } from '@/types/types';
import { FC } from 'react';
import { OpenTaskListItem } from './OpenTaskListItem';

type TUserOpenTaskProps = {
  user: TUser;
};

export const UserOpenTask: FC<TUserOpenTaskProps> = ({ user }) => {
  return (
    <div className="p-3.5 mb-2 bg-white border-2 border-grayStroke-100 border-opacity-20 last:mb-0 rounded-md shadow-md">
      <h3 className="text-grayStroke-100 max-sm:text-s14">
        <span className="text-black font-medium text-sm16 max-sm:text-s14">
          {user.firstName || user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email}
        </span>
        {' - '}
        <span className="text-black font-medium text-sm16 max-sm:text-s14">
          {user.businessName}
        </span>
      </h3>
      {user.taskLists.length
        ? user.taskLists.map((taskList) => (
            <OpenTaskListItem key={taskList._id} taskList={taskList} />
          ))
        : null}
    </div>
  );
};
