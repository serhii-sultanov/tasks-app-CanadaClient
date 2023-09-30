import { FC, useState } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { Virtuoso } from 'react-virtuoso';
import { IconButton } from './IconButton';

type AddInfo = {
  user: string;
  taskTitle: string;
  taskList: string;
  taskDescription: string;
  taskFiles: File[];
};

type AddTaskTitleInputProps = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<AddInfo>;
  user: any;
  disabled: boolean;
  error?: string;
};

export const AddTaskTitleInput: FC<AddTaskTitleInputProps> = ({
  register,
  disabled,
  setValue,
  user,
  error,
}) => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="flex gap-2 items-center relative">
      <p className="min-w-[20%] text-grayStroke-70">
        Task Title
        {error ? (
          <span className="absolute left-1 top-3/4 text-mainRed text-xs10">
            * {error}
          </span>
        ) : null}
      </p>
      <input
        disabled={disabled}
        className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40 disabled:border-grayStroke-60"
        type="text"
        autoComplete="off"
        {...register}
      />
      <IconButton
        onClick={() => setDropDownOpen(!isDropDownOpen)}
        imgSrc="/icons/arrow-down.svg"
        disabled={disabled || !user?.taskList.length}
        classNameModificator="absolute top-1/2 -translate-y-1/2 right-6 z-10 hover:bg-addBtnHover disabled:hidden"
      />

      {isDropDownOpen && user?.taskList.length ? (
        <div className="absolute right-0 top-[110%] z-50 w-3/5 rounded-md bg-white border border-grayStroke-80 text-black p-2">
          <Virtuoso
            style={{
              height: 200,
              width: '100%',
            }}
            data={user.taskList}
            itemContent={(i, taskList) => (
              <p
                className="cursor-pointer py-1 px-3 mb-1 text-sm16 border-b-grayStroke-80 hover:bg-grayStroke-60"
                onClick={() => {
                  setValue('taskTitle', taskList);
                  setDropDownOpen(false);
                }}
              >
                {taskList}
              </p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
