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

type AddClientInputProps = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<AddInfo>;
  users: any;
  error?: string;
};

export const AddClientInput: FC<AddClientInputProps> = ({
  register,
  setValue,
  users,
  error,
}) => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center relative">
      <p className="min-w-[20%] text-grayStroke-70">
        Client
        {error ? (
          <span className="absolute left-1 top-3/4 text-mainRed text-xs10">
            * {error}
          </span>
        ) : null}
      </p>
      <input
        className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40"
        type="text"
        autoComplete="off"
        {...register}
        onFocus={() => setDropDownOpen(true)}
      />
      <IconButton
        onClick={() => setDropDownOpen(!isDropDownOpen)}
        imgSrc="/icons/arrow-down.svg"
        classNameModificator="absolute top-1/2 -translate-y-1/2 right-6 z-10 hover:bg-addBtnHover"
      />

      {isDropDownOpen ? (
        <div className="absolute right-0 top-[110%] z-50 w-3/5 rounded-md bg-white border border-grayStroke-80 text-black p-2">
          <Virtuoso
            style={{
              height: 200,
              width: '100%',
            }}
            data={users}
            itemContent={(i, user) => (
              <p
                className="cursor-pointer py-1 px-3 mb-1 text-sm16 border-b border-b-grayStroke-80 hover:bg-grayStroke-60"
                onClick={() => {
                  setValue('user', user.user);
                  //@ts-ignore
                  setValue('taskFiles', user.taskFiles);
                  setValue('taskDescription', user.taskDescription);
                  setDropDownOpen(false);
                }}
              >
                {user.user}
              </p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
