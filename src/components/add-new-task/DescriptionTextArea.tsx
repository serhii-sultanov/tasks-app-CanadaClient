import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import { FC } from 'react';

export const DescriptionTextArea: FC = ({}) => {
  const { register, watch, errors } = useAddTaskContext();
  const { task_title } = watch();

  return (
    <div className="flex flex-col gap-1 relative">
      <p className="flex gap-2 items-center justify-between text-grayStroke-70">
        Description{' '}
        {errors?.task_description?.message ? (
          <span className="text-mainRed text-xs10">
            * {errors.task_description.message}
          </span>
        ) : null}
      </p>
      <textarea
        disabled={!task_title}
        className="w-full py-2 px-5 text-sm16 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40 disabled:border-grayStroke-60"
        {...register('task_description', {
          required: 'Add description!',
        })}
      />
    </div>
  );
};
