import { useRouter } from 'next/router';
import { type FC } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { useAddTaskContext } from '@/context/AddTaskContextProvider';

type AddFormHeadProps = {
  title: string;
};

export const AddFormHead: FC<AddFormHeadProps> = ({ title }) => {
  const { reset } = useAddTaskContext();
  const router = useRouter();

  return (
    <div className="bg-mainBLue text-white flex justify-between items-center gap-3 px-9 py-5">
      <h3 className="text-white text-md20 font-medium">{title}</h3>
      <IconButton
        onClick={() => {
          router.back();
          reset();
        }}
        imgSrc="/icons/close-icon.svg"
        classNameModificator="bg-white bg-opacity-40 hover:opacity-75"
      />
    </div>
  );
};
