import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import { FC } from 'react';
import { IconButton } from '../ui/IconButton';

export const AddTaskFilesList: FC = () => {
  const { setValue, watch } = useAddTaskContext();
  const { task_files } = watch();

  const handleDelete = (name: string) => {
    const updatedList = task_files.filter((file) => file.name !== name);
    setValue('task_files', updatedList);
  };

  return (
    <ul className="max-h-[200px] overflow-auto border-2 rounded-md px-5 py-3 w-full mx-auto flex flex-col gap-4">
      {task_files.map((taskFile, i) => (
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
