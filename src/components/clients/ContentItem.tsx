import { FC } from 'react';
import { DotsButton } from '../ui/DotsButton';
import { Button } from '../ui/Button';
import { ActionButton } from '../ui/ActionButton';

type ContentItemProps = {
  name: string;
  email: string;
  doneTasks: number;
  allTasks: number;
};

const onClick = () => {
  ('');
};

export const ContentItem: FC<ContentItemProps> = ({
  name,
  email,
  doneTasks,
  allTasks,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-black font-medium">{name}</p>
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
          <DotsButton>
            <ActionButton type="edit" onClick={onClick}>
              Edit
            </ActionButton>
            <ActionButton type="delete" onClick={onClick}>
              Delete
            </ActionButton>
          </DotsButton>
        </div>
      </div>
    </div>
  );
};
