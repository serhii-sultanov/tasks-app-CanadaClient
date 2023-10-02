import { FC } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { IconButton } from '../ui/IconButton';
import { TAddNewTask } from '@/types/types';

type FilesListProps = {
  filesList: File[];
  setValue: UseFormSetValue<TAddNewTask>;
};

export const FilesList: FC<FilesListProps> = ({ filesList, setValue }) => {
  const handleDelete = (name: string) => {
    const updatedList = filesList.filter((file) => file.name !== name);
    setValue('task_files', updatedList);
  };

  return (
    <ul className="border-2 rounded-md px-5 py-3 w-full mx-auto flex flex-col gap-4">
      {filesList.map((taskFile, i) => (
        <li key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center w-8 min-w-xsMinWidth h-8 rounded-full bg-mainBLue">
              <img className="w-4 h-4" src="/icons/file-icon.svg" alt="file" />
            </div>
            <div>
              <h4 className="text-xs12 text-mainBLue break-all">
                {taskFile.name}
              </h4>
              <p className="text-grayStroke-100 text-xs12">{`${(
                taskFile.size / 1024
              ).toFixed(0)} kb`}</p>
            </div>
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
