import { FC } from 'react';
import { DotsButton } from '../ui/DotsButton';
import { Button } from '../ui/Button';
import { ActionButton } from '../ui/ActionButton';
import { TTaskList, TUser } from '@/types/types';

type ContentItemProps = {
  client: TUser;
};

const onClick = () => {
  ('');
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
    <div className="bg-white p-5 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-black font-medium">{fullName}</p>
          <p className="text-sm text-grayStroke-70 font-medium">
            {businessName}
          </p>
          <p className=" text-sm text-grayMedium">{email}</p>
        </div>
        <div className="flex items-center">
          <Button
            type="button"
            classNameModificator="bg-grayStrong hover:opacity-80"
          >
            Access
          </Button>
          <div className="min-w-[70px] flex items-center ml-6">
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
