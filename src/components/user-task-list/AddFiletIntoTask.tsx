import clsx from 'clsx';
import { type FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

type AddFilesIntoTask = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<any>;
  files: File[];
};

export const AddFilesIntoTask: FC<AddFilesIntoTask> = ({
  register,
  setValue,
  files,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (files?.length) {
      setValue('files', [...files, ...acceptedFiles]);
    } else {
      setValue('files', acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
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
        'border-2 border-dashed rounded-md border-opacity-40 p-5 w-full cursor-pointer border-mainBLue',
      )}
    >
      <p className="text-sm16 text-center text-grayStroke-70 mb-1">
        Drop files here or click to upload
      </p>
      <p className="text-xs12 text-center text-grayStroke-70">
        Only: png | jpg | pdf | zip | csv | xls | xlsx | jpeg
      </p>
      <input {...getInputProps()} {...register} />
    </div>
  );
};
