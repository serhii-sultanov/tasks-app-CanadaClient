import clsx from 'clsx';
import { FC, useState } from 'react';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';
import { useUpdatePassword } from '@/hooks/useUpdatePassword';

export const UpdatePassword: FC = () => {
  const [isPassShow, setIsPassShow] = useState(false);
  const { handleUpdate, handleSubmit, errors, isSubmitting, register } =
    useUpdatePassword();
  return (
    <div className="flex-1">
      <h3 className="text-grayStroke-100 font-semibold text-lg mb-4">
        Change password
      </h3>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <label className="relative mb-2 flex gap-1">
          <input
            className={clsx(
              'w-full py-1.5 px-3.5 pr-10 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
              errors.password ? 'border-mainRed outline-mainRed' : null,
            )}
            type={isPassShow ? 'text' : 'password'}
            placeholder="Set new strong password"
            {...register('password', {
              required: 'Password is required!',
              minLength: { value: 6, message: 'Min 6 symbols' },
            })}
          />
          {errors.password ? (
            <span className="absolute left-1 -top-3 text-mainRed text-xs10">
              * {errors.password.message}
            </span>
          ) : null}
          <button type="button" onClick={() => setIsPassShow((prev) => !prev)}>
            {isPassShow ? (
              <img
                className="w-5 h-5 opacity-60 hover:opacity-80 transition-all duration-200"
                src="/icons/open-eye.svg"
                alt="open"
              />
            ) : (
              <img
                className="w-5 h-5 opacity-60 hover:opacity-80 transition-all duration-200"
                src="/icons/close-eye.svg"
                alt="open"
              />
            )}
          </button>
        </label>
        <Button
          disabled={isSubmitting}
          classNameModificator="bg-btnBlue text-white hover:bg-btnBlueHover transition-all duration-200"
          type="submit"
        >
          {isSubmitting ? <Loader /> : 'Change'}
        </Button>
      </form>
    </div>
  );
};
