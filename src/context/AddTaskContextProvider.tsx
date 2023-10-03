import type { TAddNewTask, TFormDropDown } from '@/types/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC, type ReactNode, useContext, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddTaskContext } from './addTaskContext';

type AddTaskContextProviderProps = {
  children: ReactNode;
};

export const AddTaskContextProvider: FC<AddTaskContextProviderProps> = ({
  children,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<TAddNewTask>();

  const [isDropDownOpen, setDropDownOpen] = useState<TFormDropDown>('');

  const { data: session } = useSession();
  const { replace, asPath } = useRouter();

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

  const contextValue = {
    register,
    setValue,
    resetField,
    reset,
    formSubmit,
    handleSubmit,
    errors,
    watch,
    isDropDownOpen,
    setDropDownOpen,
  };

  return (
    <AddTaskContext.Provider value={contextValue}>
      {children}
    </AddTaskContext.Provider>
  );
};

export const useAddTaskContext = () => {
  const ctx = useContext(AddTaskContext);
  if (!ctx) {
    throw new Error('Add task context is not provided');
  }
  return ctx;
};
