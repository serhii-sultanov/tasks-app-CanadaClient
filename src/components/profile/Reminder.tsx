import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';
import clsx from 'clsx';
import type { TTaskReminder } from '@/types/types';
import { useSetReminder } from '@/hooks/useSetReminder';

type TReminderProps = {
  reminder: TTaskReminder[];
};

export const Reminder: FC<TReminderProps> = ({ reminder }) => {
  const { data } = useSession();
  if (data?.user.role === 'client') {
    return null;
  }
  const { handleSubmit, handleUpdate, register, errors, isSubmitting } =
    useSetReminder(reminder);
  return (
    <div className="flex-1">
      <h3 className="text-grayStroke-100 font-semibold text-lg mb-4">
        Reminder frequency
      </h3>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <label className="relative mb-2 flex gap-1">
          <input
            className={clsx(
              'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
              errors.dayBetween ? 'border-mainRed outline-mainRed' : null,
            )}
            type={'text'}
            placeholder="Set new reminder frequency (day)"
            {...register('dayBetween', {
              required: 'Day between is required!',
              pattern: {
                value: /^(?:[1-9]|[12]\d|3[01])$/,
                message: 'Only day between (1-31)',
              },
            })}
          />
          {errors.dayBetween ? (
            <span className="absolute left-1 -top-3 text-mainRed text-xs10">
              * {errors.dayBetween.message}
            </span>
          ) : null}
        </label>
        <Button
          classNameModificator="bg-btnBlue text-white hover:bg-btnBlueHover transition-all duration-200"
          type="submit"
        >
          {isSubmitting ? <Loader /> : 'Update'}
        </Button>
      </form>
    </div>
  );
};
