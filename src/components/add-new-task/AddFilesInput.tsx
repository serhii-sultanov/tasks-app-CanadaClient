import { useAddTaskContext } from '@/context/AddTaskContextProvider';
import clsx from 'clsx';
import { type FC } from 'react';
import { useDropzone } from 'react-dropzone';

export const AddFilesInput: FC = () => {
  const { register, setValue, watch } = useAddTaskContext();
  const { user_id, task_files } = watch();

  const onDrop = (acceptedFiles: File[]) => {
    if (task_files?.length) {
      setValue('task_files', [...task_files, ...acceptedFiles]);
    } else {
      setValue('task_files', acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: !user_id,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': [
        '.xls',
        '.xlt',
        '.xlm',
        '.xld',
        '.xla',
        '.xlc',
        '.xlw',
      ],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'application/zip': ['.zip'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-md border-opacity-40 p-5 w-full cursor-pointer',
        !user_id
          ? 'cursor-default border-grayStroke-60 border-opacity-100'
          : 'border-mainBLue',
      )}
    >
      <p className="text-sm16 text-center text-grayStroke-70 mb-1">
        Drop files here or click here to upload
      </p>
      <p className="text-xs12 text-center text-grayStroke-70">
        Only: png | jpg | pdf | zip | csv | xls | xlsx | jpeg
      </p>
      <input {...getInputProps()} {...register('task_files')} />
    </div>
  );
};
