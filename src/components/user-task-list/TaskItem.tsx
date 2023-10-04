import { useFastResponse } from '@/hooks/useFastResponse';
import type { TTask } from '@/types/types';
import { convertDynamicDate } from '@/utils/convertDate';
import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { Button } from '../ui/Button';
import { FilesList } from '../ui/FilesList';
import { Loader } from '../ui/Loader';
import { AddFilesIntoTask } from './AddFiletIntoTask';
import { StatusSelect } from './StatusSelect';

type TaskItemProps = {
  task: TTask;
  userId: string;
};

export const TaskItem: FC<TaskItemProps> = ({ task, userId }) => {
  const [accordion, setAccordion] = useState<boolean>(false);
  const { formattedDynamicCreatedAt } = useMemo(() => {
    return convertDynamicDate(task.createdAt, task.updatedAt);
  }, [task.createdAt, task.updatedAt]);

  const {
    handleSubmit,
    handleSendResponse,
    files,
    messageValue,
    errors,
    handleTextareaInput,
    register,
    isLoading,
    setValue,
  } = useFastResponse(userId, task._id, () => setAccordion(false));

  return (
    <>
      <div className="rounded-lg bg-white shadow-sm p-5">
        <div className="flex justify-between items-center max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-4">
          <div>
            <Link
              href={`${ROUTE.USER_TASK}/${task._id}`}
              target="_blank"
              className="text-sm16 font-medium text-black hover:text-mainBLue transition-all duration-200"
            >
              {task.task_title}
            </Link>
            <span
              className="text-grayStroke-70 text-xs12 first-letter:uppercase block max-sm:text-xs12 mt-1"
              suppressHydrationWarning
            >
              {formattedDynamicCreatedAt}
            </span>
          </div>
          <button
            className={clsx(
              task.status === 'waiting for client'
                ? 'bg-mainGreen hover:border-greenBtnHover'
                : 'bg-grayStroke-100 hover:border-grayBtnHover',
              'text-white py-1 px-3 rounded-md min-w-[120px] text-sm16 font-medium border-4 border-transparent transition-all duration-200',
            )}
            type="button"
            onClick={() => setAccordion((prev) => !prev)}
          >
            {task.status === 'waiting for client' ? 'Respond' : 'Responded'}
          </button>
        </div>
      </div>
      <div
        className={clsx(
          accordion ? 'block overflow-auto' : 'hidden h-0 opacity-0',
          'transition-all duration-300 w-full rounded-lg bg-white px-2.5 shadow-sm',
        )}
      >
        <form
          className="mx-2.5 my-4"
          onSubmit={handleSubmit(handleSendResponse)}
        >
          <div className="flex items-start justify-between mb-4 gap-5 max-[576px]:flex-col max-[576px]:items-stretch">
            <label className="relative block flex-1">
              <textarea
                className={clsx(
                  'w-full block px-3.5 text-s14 font-medium outline-none rounded-md border focus:border-mainBLue focus:border-opacity-70 text-black',
                  errors.message ? 'border-mainRed' : null,
                  'overflow-hidden min-h-[30px] h-auto py-1 resize-none',
                )}
                placeholder="Type message"
                {...register('message')}
                rows={5}
                style={{
                  overflowWrap: 'break-word',
                }}
                value={messageValue}
                onInput={handleTextareaInput}
              />
              {errors.message ? (
                <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                  * {errors.message.message}
                </span>
              ) : null}
            </label>
            <StatusSelect
              userId={userId}
              status={task.status}
              taskId={task._id}
            />
          </div>
          <div className="mb-2">
            <AddFilesIntoTask
              files={files}
              register={register('files')}
              setValue={setValue}
            />
          </div>
          {files?.length ? (
            <FilesList filesList={files} setValue={setValue} />
          ) : null}
          <Button
            disabled={isLoading}
            classNameModificator="bg-mainGreen hover:border-greenBtnHover text-white px-2 rounded-md max-w-[140px] text-sm16 font-medium border-2 border-transparent transition-all duration-200 mt-4"
            type="submit"
          >
            {isLoading ? <Loader /> : 'Submit'}
          </Button>
        </form>
      </div>
    </>
  );
};
