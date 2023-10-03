import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

type TaskItemFormProps = {
  files: File[];
  message: string;
};

export const useFastResponse = () => {
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

  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';

    setValue('message', event.target.value);
  };

  const handleSendResponse = (data: TaskItemFormProps) => {
    try {
      console.log(data);
      reset();
    } catch (err) {
      toast.error('Error occured when sending comment');
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
  };
};
