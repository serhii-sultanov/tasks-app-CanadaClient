import { IconButton } from '@/components/ui/IconButton';
import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import type { TTaskList } from '@/types/types';
import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

type AddTaskListInputProps = {
  taskLists: TTaskList[] | undefined;
};

export const AddTaskListInput: FC<AddTaskListInputProps> = ({ taskLists }) => {
  const {
    register,
    resetField,
    isDropDownOpen,
    setDropDownOpen,
    setValue,
    errors,
    watch,
  } = useAddTaskContext();
  const { user_id } = watch();
  const [virtuosoData, setVirtuosoData] = useState<TTaskList[]>();

  const handleSelectTaskList = (listName: string) => {
    resetField('task_title');
    resetField('task_description');
    setValue('task_list_name', listName);
    setDropDownOpen('');
  };

  const handleSearchTaskList = (e: ChangeEvent<HTMLInputElement>) => {
    const search = taskLists?.filter((list) =>
      list.task_list_name.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setValue('task_list_name', e.target.value);

    if (e.target.value.length) {
      setDropDownOpen('taskLists');
    } else {
      resetField('task_title');
      resetField('task_description');
      setDropDownOpen('');
    }

    if (!search?.length) {
      resetField('task_title');
      resetField('task_description');
    }

    setVirtuosoData(search);
  };

  useEffect(() => {
    if (taskLists) {
      setVirtuosoData(taskLists);
    }
  }, [taskLists]);

  return (
    <div className="flex flex-col gap-1 relative">
      <p className="flex gap-2 items-center justify-between text-grayStroke-70">
        Task List
        {errors?.task_list_name?.message ? (
          <span className="text-mainRed text-xs10">
            * {errors.task_list_name.message}
          </span>
        ) : null}
      </p>
      <input
        disabled={!user_id}
        className="w-full py-2 px-5 text-sm16 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40 disabled:border-grayStroke-60"
        type="text"
        autoComplete="off"
        {...register('task_list_name', {
          required: 'Select task list!',
        })}
        onChange={handleSearchTaskList}
      />
      <IconButton
        onClick={() =>
          isDropDownOpen !== 'taskLists'
            ? setDropDownOpen('taskLists')
            : setDropDownOpen('')
        }
        imgSrc="/icons/arrow-down.svg"
        disabled={!user_id || !taskLists?.length}
        classNameModificator="absolute bottom-1.5 right-6 z-10 hover:bg-addBtnHover disabled:hidden"
      />

      {isDropDownOpen === 'taskLists' && virtuosoData?.length ? (
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
            itemContent={(i, taskList) => (
              <p
                className="cursor-pointer py-1 px-3 mb-1 text-sm16 border-b border-b-grayStroke-80 hover:bg-grayStroke-60"
                onClick={() => handleSelectTaskList(taskList.task_list_name)}
              >
                {taskList.task_list_name}
              </p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
