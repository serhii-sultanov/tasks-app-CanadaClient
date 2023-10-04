import { useEditTaskListName } from '@/hooks/useEditTaskListName';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { Button } from '../ui/Button';
import { DotsButton } from '../ui/DotsButton';
import { Loader } from '../ui/Loader';

type ContentBoxProps = {
  title?: string;
  children: React.ReactNode;
  taskListId?: string;
  userId?: string;
};

export const ContentBox: FC<ContentBoxProps> = ({
  title,
  children,
  taskListId,
  userId,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const session = useSession();
  const {
    handleSubmit,
    handleTaskListNameUpdate,
    errors,
    register,
    isSubmitting,
  } = useEditTaskListName(
    () => setIsEdit(false),
    taskListId as string,
    title as string,
  );

  return (
    <div className="w-full bg-grayBg rounded-lg p-4 flex flex-col gap-4 shadow-md">
      {title ? (
        <div className="flex items-start justify-between gap-10 max-sm:gap-1">
          {!isEdit ? (
            <h2 className="text-black font-medium">{title}</h2>
          ) : (
            <form
              className="flex-1"
              onSubmit={handleSubmit(handleTaskListNameUpdate)}
            >
              <div className="flex gap-2 items-center max-sm:flex-col max-sm:items-start">
                <label className="relative block grow w-full">
                  <input
                    className={clsx(
                      'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
                      errors.newTaskListName
                        ? 'border-mainRed outline-mainRed'
                        : null,
                    )}
                    type="text"
                    placeholder="Task List Title"
                    {...register('newTaskListName', {
                      required: 'Task list title is required!',
                    })}
                  />
                  {errors.newTaskListName ? (
                    <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                      * {errors.newTaskListName.message}
                    </span>
                  ) : null}
                </label>
                <div className="flex gap-1">
                  <Button
                    classNameModificator="bg-btnBlue hover:bg-btnBlueHover transition-all duration-200 py-0 text-xs12 min-w-[80px] w-full"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? <Loader /> : 'Update'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsEdit(false)}
                    classNameModificator="min-w-[50px] bg-white border border-gray-100 hover:bg-opacity-60 transition-all duration-200"
                  >
                    <img
                      className="w-4 h-4"
                      src="/icons/cancel-icon.svg"
                      alt="Cancel"
                    />
                  </Button>
                </div>
              </div>
            </form>
          )}
          {session.data?.user.role === 'admin' ? (
            <DotsButton
              taskListId={taskListId}
              userId={userId}
              setEdit={() => setIsEdit((prev) => !prev)}
            />
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
};
