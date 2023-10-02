import type { TAddNewTask, TFormDropDown, TUser } from '@/types/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<TAddNewTask>();
  const { user_id, task_title, task_list_name, task_files } = watch();

  const [isDropDownOpen, setDropDownOpen] = useState<TFormDropDown>('');

  const { data: session } = useSession();
  const { replace, asPath } = useRouter();

  const findedUser = users.find((item) => item._id === user_id);

  const findedTaskList = findedUser?.taskLists.find(
    (list) => list.task_list_name === task_list_name,
  );

  const formSubmit: SubmitHandler<TAddNewTask> = async (data) => {
    const {
      user_id,
      task_title,
      task_list_name,
      task_description,
      task_files,
    } = data;

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('task_title', task_title);
    formData.append('task_list_name', task_list_name);
    formData.append('task_description', task_description);
    task_files?.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/create-task`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );

      if (res?.data) {
        toast.success(res.data.message);
        reset();
        replace(asPath);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex w-full flex-col text-sm16 justify-center gap-4 px-9 py-5">
        <AddClientInput
          register={register('user_name', { required: 'Select a client!' })}
          users={users}
          setValue={setValue}
          error={errors.user_id?.message}
          reset={resetField}
          isDropDownOpen={isDropDownOpen}
          setDropDownOpen={setDropDownOpen}
        />
        <AddTaskListInput
          register={register('task_list_name', {
            required: 'Select task list!',
          })}
          taskLists={findedUser?.taskLists}
          setValue={setValue}
          disabled={!user_id}
          error={errors.task_list_name?.message}
          reset={resetField}
          isDropDownOpen={isDropDownOpen}
          setDropDownOpen={setDropDownOpen}
        />
        <AddTaskTitleInput
          register={register('task_title', { required: 'Select task!' })}
          taskList={findedTaskList?.task_list}
          setValue={setValue}
          disabled={!task_list_name}
          error={errors.task_title?.message}
          reset={resetField}
          isDropDownOpen={isDropDownOpen}
          setDropDownOpen={setDropDownOpen}
        />
        <DescriptionTextArea
          register={register('task_description', {
            required: 'Add description!',
          })}
          error={errors.task_title?.message}
          disabled={!task_title}
        />
        <AddFilesInput
          register={register('task_files')}
          setValue={setValue}
          taskFiles={task_files}
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
