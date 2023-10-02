import type { TTaskList, TUser } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';

type ContentItemProps = {
  client: TUser;
};

export const ContentItem: FC<ContentItemProps> = ({ client }) => {
  const { firstName, lastName, taskLists, email, businessName } = client;
  const fullName = `${firstName} ${lastName}`;
  const { allTasks, doneTasks } = taskLists.reduce(
    (accumulator, currentTaskList: TTaskList) => {
      accumulator.allTasks += currentTaskList.task_list.length;
      accumulator.doneTasks += currentTaskList.task_list.filter(
        (task) => task.status === 'completed',
      ).length;
      return accumulator;
    },
    { allTasks: 0, doneTasks: 0 },
  );
  return (
    <div className="bg-white p-5 max-[530px]:p-3.5 rounded-lg mb-4">
      <div className="flex justify-between items-center gap-4 max-[530px]:flex-col max-[530px]:justify-center max-[530px]:text-center">
        <div className="flex-1 break-all">
          <p className="text-black font-medium">{fullName}</p>
          <p className="text-s14 text-mainBLue font-medium">{businessName}</p>
          <p className=" text-s14 text-grayMedium">{email}</p>
        </div>
        <div className="flex items-center justify-between gap-4 min-w-[170px] max-[530px]:flex-col-reverse">
          <Link
            href={`${ROUTE.USER_TASK_LIST}/${client._id}`}
            type="button"
            className="bg-grayStrong hover:opacity-80 max-w-[100px] flex justify-center items-center w-full font-semibold text-sm16 rounded-[0.25rem] border border-transparent py-1.5 px-4"
          >
            Access
          </Link>
          <div className="flex items-center">
            <img
              src="/icons/list-check-icon.svg"
              alt="tasks-list"
              className=" w-4 h-4 mr-1"
            />
            <span className="text-grayMedium">
              {doneTasks}/{allTasks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
