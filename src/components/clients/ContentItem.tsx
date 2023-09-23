import { FC } from 'react';

type ContentItemProps = {
  name: string;
  email: string;
  doneTasks: number;
  allTasks: number;
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
          <p>{name}</p>
          <p>{email}</p>
        </div>
        <div>
          {doneTasks}/{allTasks}
        </div>
      </div>
    </div>
  );
};
