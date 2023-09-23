import clsx from 'clsx';
import { FC, useState, DragEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';
import { Virtuoso } from 'react-virtuoso';

type AddInfo = {
  user: string;
  taskTitle: string;
  taskList: string;
  taskDescription: string;
  taskFiles: any[];
};

const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Emma',
  'Frank',
  'Grace',
  'Hannah',
  'Isaac',
  'Jack',
  'Katie',
  'Liam',
  'Mia',
  'Noah',
  'Olivia',
  'Paul',
  'Quinn',
  'Ryan',
  'Sophia',
  'Taylor',
  'Uma',
  'Victor',
  'Wendy',
  'Xander',
  'Yara',
  'Zoe',
];

export const AddNewTask: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<AddInfo>();
  const [dragActive, setDragActive] = useState(false);

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
      setValue('taskFiles', (prev) => [prev, ...e.dataTransfer.files]);
    }
  };

  return (
    <div className="max-w-container mb-5 text-md20 font-medium">
      <div className="bg-mainBLue text-white flex justify-between items-center gap-3 px-9 py-5 mb-5">
        <h3 className="text-white ">Add New Task</h3>
        <button className="flex justify-center items-center w-8 min-w-[32px] h-8 bg-white bg-opacity-40 rounded-full hover:opacity-75">
          <img className="w-4 h-4" src="/icons/close-icon.svg" alt="close" />
        </button>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="flex flex-col justify-center items-stretch gap-6">
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
                  data={names}
                  itemContent={(index, user) => (
                    <p
                      className="cursor-pointer py-1 px-3 mb-1 text-sm16 rounded-md hover:bg-grayStroke-40"
                      onClick={() => {
                        setValue('user', user);
                        setIsOpen(false);
                      }}
                    >
                      {user}
                    </p>
                  )}
                />
              </div>
            ) : null}
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
            <p className="min-w-[20%] text-grayStroke-70">Task List</p>
            <input
              className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-20"
              type="text"
              {...register('taskList')}
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
            />
          </label>
          <Button
            type="submit"
            classNameModificator="bg-mainBlue text-sm14 hover:bg-blueHover transition-all duration-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
