import { TFile } from '@/types/types';
import { downloadFile } from '@/utils/downloadFile';
import React, { FC } from 'react';

type LoadFileButtonProps = {
  file: TFile;
};

export const LoadFileButton: FC<LoadFileButtonProps> = ({ file }) => {
  return (
    <div
      className="flex items-center gap-1.5 mb-2 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        downloadFile(file);
      }}
    >
      <div className="border-l-4 border-l-mainBLue border-opacity-25">
        <div className="ml-2 w-8 h-8 rounded-full bg-mainBlue flex justify-center items-center">
          <img className="w-4 h-4" src="/icons/file-icon.svg" alt="file" />
        </div>
      </div>
      <div>
        <h4 className="text-xs12 text-mainBLue break-all">
          {file.file_originalName}
        </h4>
        <p className="text-grayStroke-100 text-xs12">{`${(
          file.file_size / 1024
        ).toFixed(0)} kb`}</p>
      </div>
    </div>
  );
};
