import { FC } from 'react';
import { DotsButton } from './DotsButton';
import { ActionButton } from './ActionButton';
import { UseFormSetValue } from 'react-hook-form';
import { IconButton } from './IconButton';

type AddInfo = {
  user: string;
  taskTitle: string;
  taskList: string;
  taskDescription: string;
  taskFiles: File[];
};

type FilesListProps = {
  filesList: File[];
  userName: string;
  setValue: UseFormSetValue<AddInfo>;
};

export const FilesList: FC<FilesListProps> = ({
  userName,
  filesList,
  setValue,
}) => {
  const handleDelete = (name: string) => {
    const updatedList = filesList.filter((file) => file.name !== name);
    setValue('taskFiles', updatedList);
  };

  return (
    <ul className="border-2 rounded-md px-5 py-3 w-full mx-auto flex flex-col gap-4">
      {filesList.map((taskFile, i) => (
        <li key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex">
              <div className="flex justify-center items-center w-8 min-w-xsMinWidth h-8 rounded-full bg-mainBLue z-10">
                <img
                  className="w-4 h-4"
                  src="/icons/file-icon.svg"
                  alt="file"
                />
              </div>
              <div className="flex justify-center items-center w-8 min-w-xsMinWidth h-8 rounded-full bg-red-600 -translate-x-3 z-0">
                <span className=" text-white text-center text-s14">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <p className="text-xs12 text-grayStroke-70">{taskFile.name}</p>
          </div>

          <IconButton
            imgSrc="/icons/delete-icon.svg"
            onClick={() => handleDelete(taskFile.name)}
            classNameModificator="hover:bg-mainRed hover:bg-opacity-20"
          />
        </li>
      ))}
    </ul>
  );
};
