import type { TTaskList } from '@/types/types';
import { FC } from 'react';
import { OpenTaskItem } from './OpenTaskItem';

type OpenTaskListItemProps = {
  taskList: TTaskList;
};

export const OpenTaskListItem: FC<OpenTaskListItemProps> = ({ taskList }) => {
  return (
    <div className="mb-1 border-b-2 border-grayStroke-100 py-1 border-opacity-20">
      <h4 className="text-grayStroke-100 mb-1 max-sm:text-s14">
        {taskList.task_list_name}
      </h4>
      {taskList.task_list.length
        ? taskList.task_list.map((task) => (
            <OpenTaskItem key={task._id} task={task} />
          ))
        : null}
    </div>
  );
};
