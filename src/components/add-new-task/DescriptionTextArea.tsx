import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type DescriptionTextAreaProps = {
  register: UseFormRegisterReturn<string>;
  disabled: boolean;
  error?: string;
};

export const DescriptionTextArea: FC<DescriptionTextAreaProps> = ({
  error,
  register,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <p className="flex gap-2 items-center justify-between text-grayStroke-70">
        Description{' '}
        {error ? (
          <span className="text-mainRed text-xs10">* {error}</span>
        ) : null}
      </p>
      <textarea
        disabled={disabled}
        className="w-full py-2 px-5 text-sm16 text-black outline-mainBLue rounded-md border-2 border-mainBLue border-opacity-40 disabled:border-grayStroke-60"
        {...register}
      />
    </div>
  );
};
