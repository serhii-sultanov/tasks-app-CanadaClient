import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import type { TUser } from '@/types/types';
import { type FC } from 'react';
import { Button } from '../ui/Button';
import { AddClientInput } from './AddClientInput';
import { AddFilesInput } from './AddFilesInput';
import { AddTaskListInput } from './AddTaskListInput';
import { AddTaskTitleInput } from './AddTaskTitleInput';
import { DescriptionTextArea } from './DescriptionTextArea';
import { FilesList } from './FilesList';

type AddTaskFormProps = {
  users: TUser[];
};

export const AddTaskForm: FC<AddTaskFormProps> = ({ users }) => {
  const { handleSubmit, formSubmit, register, setValue, watch } =
    useAddTaskContext();
  const { user_id, task_list_name, task_files } = watch();

  const findedUser = users.find((item) => item._id === user_id);

  const findedTaskList = findedUser?.taskLists.find(
    (list) => list.task_list_name === task_list_name,
  );

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex w-full flex-col text-sm16 justify-center gap-4 px-9 py-5">
        <AddClientInput users={users} />
        <AddTaskListInput taskLists={findedUser?.taskLists} />
        <AddTaskTitleInput taskList={findedTaskList?.task_list} />
        <DescriptionTextArea />
        <AddFilesInput
          register={register('task_files')}
          setValue={setValue}
          files={task_files}
          disabled={!user_id}
        />
        {task_files?.length ? (
          <FilesList filesList={task_files} setValue={setValue} />
        ) : null}
        <Button
          type="submit"
          classNameModificator="bg-mainBlue text-sm14 hover:bg-blueHover transition-all duration-200 text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
