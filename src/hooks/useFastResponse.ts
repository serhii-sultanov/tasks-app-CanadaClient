import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useState } from 'react';

type TaskItemFormProps = {
  files: File[];
  message: string;
};

export const useFastResponse = (
  clientId: string,
  taskId: string,
  setAccordion: () => void,
) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TaskItemFormProps>();
  const messageValue = watch('message', '');
  const files = watch('files');
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';

    setValue('message', event.target.value);
  };

  const handleSendResponse = async (data: TaskItemFormProps) => {
    try {
      if (!data.message.trim() && !data?.files?.length) {
        return;
      }
      setIsLoading(true);
      const session = await getSession();
      const formData = new FormData();
      formData.append('task_id', taskId);
      formData.append('clientId', clientId);
      formData.append('comment', data.message);
      if (data?.files?.length) {
        data.files?.forEach((file) => formData.append('files', file));
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/comment/task`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );

      await queryClient.invalidateQueries(['client']);
      setIsLoading(false);
      setAccordion();
      toast.success(response.data.message);
      reset();
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  return {
    handleSubmit,
    handleSendResponse,
    handleTextareaInput,
    files,
    messageValue,
    errors,
    reset,
    register,
    setValue,
    isLoading,
  };
};
