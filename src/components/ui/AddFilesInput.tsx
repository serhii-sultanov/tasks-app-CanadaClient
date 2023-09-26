import clsx from 'clsx';
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

type AddInfo = {
  user: string;
  taskTitle: string;
  taskList: string;
  taskDescription: string;
  taskFiles: File[];
};

type AddFileInput = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<AddInfo>;
  taskFiles: File[];
  disabled: boolean;
};

export const AddFilesInput: FC<AddFileInput> = ({
  register,
  setValue,
  taskFiles,
  disabled,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    setValue('taskFiles', [...taskFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, disabled });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-md border-opacity-40 p-5 w-full flex items-center justify-center cursor-pointer',
        disabled
          ? 'cursor-default border-grayStroke-60 border-opacity-100'
          : 'border-mainBLue',
      )}
    >
      <span className="text-sm16 text-grayStroke-70">
        Drop files here or click here to upload
      </span>
      <input {...getInputProps()} {...register} />
    </div>
  );
};
