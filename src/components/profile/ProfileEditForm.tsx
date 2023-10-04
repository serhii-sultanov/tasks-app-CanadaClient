import { useProfileEdit } from '@/hooks/useProfileEdit';
import type { TUserProfile } from '@/types/types';
import clsx from 'clsx';
import { FC } from 'react';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';

type TProfileFormProps = {
  profile: TUserProfile;
};

export const ProfileEditForm: FC<TProfileFormProps> = ({ profile }) => {
  const { handleSubmit, register, errors, isSubmitting, handleUpdate } =
    useProfileEdit(profile);

  return (
    <div className="mb-8 pb-8 border-b border-grayStroke-100 border-opacity-20">
      <h3 className="text-grayStroke-100 mb-6 font-semibold text-3xl">
        Profile form
      </h3>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="flex flex-col w-full gap-4 mb-4">
          <label className="relative">
            <input
              className={clsx(
                'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
                errors.firstName ? 'border-mainRed outline-mainRed' : null,
              )}
              type="text"
              placeholder="John"
              {...register('firstName', {
                required: 'First name is required!',
              })}
            />
            {errors.firstName ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.firstName.message}
              </span>
            ) : null}
          </label>
          <label className="relative">
            <input
              className={clsx(
                ' w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
                errors.lastName ? 'border-mainRed outline-mainRed' : null,
              )}
              type="text"
              placeholder="Smith"
              {...register('lastName', {
                required: 'Last name is required!',
              })}
            />
            {errors.lastName ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.lastName.message}
              </span>
            ) : null}
          </label>
          <label className="relative">
            <input
              className={clsx(
                ' w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
                errors.businessName ? 'border-mainRed outline-mainRed' : null,
              )}
              type="text"
              placeholder="Your business name"
              {...register('businessName', {
                required: 'Business name is required!',
              })}
            />
            {errors.lastName ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.lastName.message}
              </span>
            ) : null}
          </label>
          <label className="relative">
            <input
              className={clsx(
                ' w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20 text-black',
                errors.email ? 'border-mainRed outline-mainRed' : null,
              )}
              type="email"
              placeholder="Email Address"
              {...register('email', {
                required: 'Email is required!',
              })}
            />
            {errors.email ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.email.message}
              </span>
            ) : null}
          </label>
        </div>
        <Button
          disabled={isSubmitting}
          classNameModificator="bg-btnBlue text-white hover:bg-btnBlueHover transition-all duration-200"
          type="submit"
        >
          {isSubmitting ? <Loader /> : 'Update'}
        </Button>
      </form>
    </div>
  );
};
