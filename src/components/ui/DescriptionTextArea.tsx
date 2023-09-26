import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type DescriptionTextAreaProps = {
  register: UseFormRegisterReturn<string>;
  disabled: boolean;
};

export const DescriptionTextArea: FC<DescriptionTextAreaProps> = ({
  register,
  disabled,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="min-w-[20%] text-grayStroke-70">Description</p>
      <textarea
        disabled={disabled}
        className="w-full py-3 px-5 text-md20 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40 disabled:border-grayStroke-60"
        {...register}
      />
    </div>
  );
};
