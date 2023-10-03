import type { TAddNewTask } from '@/types/types';
import clsx from 'clsx';
import { type FC } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

type AddFileInput = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<TAddNewTask>;
  files: File[];
  disabled?: boolean;
};

export const AddFilesInput: FC<AddFileInput> = ({
  register,
  setValue,
  files,
  disabled,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (files?.length) {
      setValue('task_files', [...files, ...acceptedFiles]);
    } else {
      setValue('task_files', acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled,
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
        disabled
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
      <input {...getInputProps()} {...register} />
    </div>
  );
};
