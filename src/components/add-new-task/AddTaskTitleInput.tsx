import { IconButton } from '@/components/ui/IconButton';
import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import type { TTask } from '@/types/types';
import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

type AddTaskTitleInputProps = {
  taskList: TTask[] | undefined;
};

export const AddTaskTitleInput: FC<AddTaskTitleInputProps> = ({ taskList }) => {
  const {
    register,
    resetField,
    isDropDownOpen,
    setDropDownOpen,
    setValue,
    watch,
    errors,
  } = useAddTaskContext();
  const { task_list_name } = watch();
  const [virtuosoData, setVirtuosoData] = useState<TTask[]>();

  const handleSelectTask = (taskTitle: string, taskDescription: string) => {
    resetField('task_description');
    resetField('task_files');
    setValue('task_title', taskTitle);
    setValue('task_description', taskDescription);
    setDropDownOpen('');
  };

  const handleSearchTask = (e: ChangeEvent<HTMLInputElement>) => {
    const search = taskList?.filter((task) =>
      task.task_title.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setValue('task_title', e.target.value);

    if (e.target.value.length) {
      setDropDownOpen('tasks');
    } else {
      resetField('task_description');
      resetField('task_files');
      setDropDownOpen('');
    }

    if (!search?.length) {
      resetField('task_description');
      resetField('task_files');
    }

    setVirtuosoData(search);
  };

  useEffect(() => {
    if (taskList) {
      setVirtuosoData(taskList);
    }
  }, [taskList]);

  return (
    <div className="flex flex-col gap-1 relative">
      <p className="flex gap-2 items-center justify-between text-grayStroke-70">
        Task Title
        {errors?.task_title?.message ? (
          <span className="text-mainRed text-xs10">
            * {errors.task_title.message}
          </span>
        ) : null}
      </p>
      <input
        disabled={!task_list_name}
        className="w-full py-2 px-5 text-sm16 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40 disabled:border-grayStroke-60"
        type="text"
        autoComplete="off"
        {...register('task_title', { required: 'Select task!' })}
        onChange={handleSearchTask}
      />
      <IconButton
        onClick={() =>
          isDropDownOpen !== 'tasks'
            ? setDropDownOpen('tasks')
            : setDropDownOpen('')
        }
        imgSrc="/icons/arrow-down.svg"
        disabled={!task_list_name || !taskList?.length}
        classNameModificator="absolute bottom-1.5 right-6 z-10 hover:bg-addBtnHover disabled:hidden"
      />

      {isDropDownOpen === 'tasks' && virtuosoData?.length ? (
        <div className="absolute right-0 top-[110%] z-50 w-full rounded-md bg-white border border-grayStroke-80 text-black p-2">
          <Virtuoso
            style={{
              height:
                virtuosoData.length < 6
                  ? `${virtuosoData.length * 37}px`
                  : '200px',
              width: '100%',
            }}
            data={virtuosoData}
            itemContent={(i, task) => (
              <p
                className="cursor-pointer py-1 px-3 mb-1 text-sm16 border-b border-b-grayStroke-80 hover:bg-grayStroke-60"
                onClick={() =>
                  handleSelectTask(task.task_title, task.task_description)
                }
              >
                {task.task_title}
              </p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
