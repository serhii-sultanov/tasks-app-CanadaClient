import clsx from 'clsx';
import {
  FC,
  useState,
  DragEvent,
  ChangeEvent,
  FormEvent,
  ChangeEventHandler,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';
import { Virtuoso } from 'react-virtuoso';
import { useRouter } from 'next/router';
import { DotsButton } from './DotsButton';
import { ActionButton } from './ActionButton';

type TaskFile = {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

type AddInfo = {
  user: string;
  taskTitle: string;
  taskList: string;
  taskDescription: string;
  taskFiles: TaskFile[];
};

const data = [
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: 'Housework',
    taskTitle: 'Clean room',
    user: 'Alice',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: 'Housework',
    taskTitle: 'Clean room',
    user: 'Bob',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: 'Housework',
    taskTitle: 'Clean room',
    user: 'Anna',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: 'Housework',
    taskTitle: 'Clean room',
    user: 'John',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: 'Housework',
    taskTitle: 'Clean room',
    user: 'Ira',
  },
];

// export class CreateTaskDto {
//   @ApiProperty()
//   @IsString()
//   task_title: string;

//   @ApiProperty()
//   user_id: string;

//   @ApiProperty()
//   task_description: string;

//   @ApiProperty()
//   task_list_name: string;
// }

export const AddTaskForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<AddInfo>();

  const { user, taskFiles } = getValues();

  const router = useRouter();

  const formSubmit: SubmitHandler<AddInfo> = async (data) => {
    console.log(data);
  };

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      //@ts-ignore
      setValue('taskFiles', [...taskFiles, ...e.dataTransfer.files]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadInput = e.target as HTMLInputElement;
    setDragActive(false);

    if (uploadInput.files && uploadInput.files[0]) {
      //@ts-ignore
      setValue('taskFiles', [...taskFiles, ...e.target.files]);
      router.replace(router.asPath);
    }
  };

  const handleDelete = (name: string) => {
    const updatedList = taskFiles.filter((file) => file.name !== name);
    setValue('taskFiles', updatedList);
    router.replace(router.asPath);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col justify-center items-stretch gap-6 px-9">
        <div className="flex gap-2 items-center relative">
          <p className="min-w-[20%] text-grayStroke-70">Client</p>
          <input
            className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-20"
            type="text"
            {...register('user')}
          />
          <button
            type="button"
            className="absolute bg-mainBLue w-5 top-1/2 -translate-y-1/2 right-6 z-10"
            onClick={() => setIsOpen(!isOpen)}
          >
            i
          </button>

          {isOpen ? (
            <div className="absolute right-0 top-[110%] z-10 w-3/5 rounded-md bg-lightMain border border-grayStroke-80 text-black p-5">
              <Virtuoso
                style={{
                  height: 200,
                  width: '100%',
                }}
                data={data}
                itemContent={(i, user) => (
                  <p
                    className="cursor-pointer py-1 px-3 mb-1 text-sm16 rounded-md hover:bg-grayStroke-40"
                    onClick={() => {
                      setValue('user', user.user);
                      setValue('taskFiles', user.taskFiles);
                      setIsOpen(false);
                    }}
                  >
                    {user.user}
                  </p>
                )}
              />
            </div>
          ) : null}
        </div>

        <div className="flex gap-2 items-center">
          <p className="min-w-[20%] text-grayStroke-70">Task List</p>
          <input
            disabled={!user}
            className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-20 disabled:border-grayStroke-60"
            type="text"
            {...register('taskList')}
          />
        </div>

        <div className="flex gap-2 items-center">
          <p className="min-w-[20%] text-grayStroke-70">Task Title</p>
          <input
            className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-20"
            type="text"
            {...register('taskTitle')}
          />
        </div>

        <div className="flex gap-2 items-center">
          <p className="min-w-[20%] text-grayStroke-70">Description</p>
          <textarea
            className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-20"
            {...register('taskDescription')}
          />
        </div>

        <label
          htmlFor="fileUploadInput"
          className="border-2 border-dashed rounded-md p-5 w-full flex items-center justify-center cursor-pointer"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleLive}
          onDrop={handleDrop}
        >
          <span className="text-sm16 text-grayStroke-70">
            Drop files here or click here to upload
          </span>
          <input
            type="file"
            id="fileUploadInput"
            className="hidden"
            {...register('taskFiles')}
            multiple
            onChange={handleChange}
          />
        </label>

        {taskFiles?.length ? (
          <ul className="border-2 rounded-md px-5 py-3 w-full mx-auto flex flex-col gap-4">
            {getValues('taskFiles').map((taskFile, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    <div className="flex justify-center items-center w-8 min-w-[32px] h-8 rounded-full bg-mainBLue z-10">
                      <img
                        className="w-4 h-4"
                        src="/icons/file-icon.svg"
                        alt="file"
                      />
                    </div>
                    <div className="flex justify-center items-center w-8 min-w-[32px] h-8 rounded-full bg-red-600 -translate-x-3 z-0">
                      <span className=" text-white text-center text-s14">
                        {user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs12 text-grayStroke-70">
                    {taskFile.name}
                  </p>
                </div>

                <DotsButton>
                  <ActionButton type="edit" onClick={() => {}}>
                    Open
                  </ActionButton>
                  <ActionButton type="edit" onClick={() => {}}>
                    Download
                  </ActionButton>
                  <ActionButton
                    type="delete"
                    onClick={() => handleDelete(taskFile.name)}
                  >
                    Delete
                  </ActionButton>
                </DotsButton>
              </li>
            ))}
          </ul>
        ) : null}

        <Button
          type="submit"
          classNameModificator="bg-mainBlue text-sm14 hover:bg-blueHover transition-all duration-200"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
