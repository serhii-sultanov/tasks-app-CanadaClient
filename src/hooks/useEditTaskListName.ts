import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type EditTaskListNameForm = {
  newTaskListName: string;
};

export const useEditTaskListName = (
  setIsEdit: () => void,
  taskListId: string,
  title: string,
) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditTaskListNameForm>({
    defaultValues: {
      newTaskListName: title,
    },
  });

  const handleTaskListNameUpdate = async (data: EditTaskListNameForm) => {
    try {
      const session = await getSession();
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/taskList/${taskListId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      await queryClient.invalidateQueries(['client']);
      setIsEdit();
      toast.success('Task list name has been successfully updated');
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  return {
    handleSubmit,
    handleTaskListNameUpdate,
    errors,
    register,
    isSubmitting,
  };
};
