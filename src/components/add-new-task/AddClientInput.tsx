import { IconButton } from '@/components/ui/IconButton';
import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import type { TUser } from '@/types/types';
import { type ChangeEvent, type FC, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

type AddClientInputProps = {
  users: TUser[];
};

export const AddClientInput: FC<AddClientInputProps> = ({ users }) => {
  const {
    register,
    resetField,
    isDropDownOpen,
    setDropDownOpen,
    setValue,
    errors,
  } = useAddTaskContext();
  const [virtuosoData, setVirtuosoData] = useState(users);

  const handleSelectClient = (user: TUser) => {
    const userName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.email;

    resetField('task_list_name');
    resetField('task_title');
    resetField('task_description');
    resetField('task_files');
    setValue('user_id', user._id);
    setValue('user_name', userName);
    setDropDownOpen('');
  };

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    const search = users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setValue('user_name', e.target.value);

    if (e.target.value.length) {
      setDropDownOpen('users');
    } else {
      resetField('task_list_name');
      resetField('task_title');
      resetField('task_description');
      resetField('task_files');
      setDropDownOpen('');
    }

    if (!search.length) {
      resetField('task_list_name');
      resetField('task_title');
      resetField('task_description');
      resetField('task_files');
    }

    setVirtuosoData(search);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <p className="text-grayStroke-70">
        Client
        {errors?.user_name?.message ? (
          <span className=" text-mainRed text-xs10">
            * {errors.user_name.message}
          </span>
        ) : null}
      </p>
      <input
        className="w-full py-2 px-5 text-sm16 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40"
        type="text"
        autoComplete="off"
        {...register('user_name', { required: 'Select a client!' })}
        onChange={handleSearchUser}
      />
      <IconButton
        onClick={() =>
          isDropDownOpen !== 'users'
            ? setDropDownOpen('users')
            : setDropDownOpen('')
        }
        imgSrc="/icons/arrow-down.svg"
        classNameModificator="absolute bottom-1.5 right-6 z-10 hover:bg-addBtnHover"
      />

      {isDropDownOpen === 'users' && virtuosoData.length ? (
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
            itemContent={(i, user) => (
              <p
                className="cursor-pointer py-1 px-3 mb-1 text-sm16 border-b border-b-grayStroke-80 hover:bg-grayStroke-60"
                onClick={() => handleSelectClient(user)}
              >
                {user.firstName || user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </p>
            )}
          />
        </div>
      ) : null}
    </div>
  );
};
