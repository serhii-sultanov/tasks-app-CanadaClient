import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IconButton } from './IconButton';

type AddFormHeadProps = {
  title: string;
};

export const AddFormHead: FC<AddFormHeadProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="bg-mainBLue text-white flex justify-between items-center gap-3 px-9 py-5 mb-5">
      <h3 className="text-white ">{title}</h3>
      <IconButton
        onClick={() => router.back()}
        imgSrc="/icons/close-icon.svg"
        classNameModificator="bg-white bg-opacity-40 hover:opacity-75"
      />
    </div>
  );
};
