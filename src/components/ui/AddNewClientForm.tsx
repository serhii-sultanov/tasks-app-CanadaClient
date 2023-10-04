import { TAddNewClient } from '@/types/types';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from './Button';

export const AddNewClientForm: FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TAddNewClient>();

  const { replace, asPath } = useRouter();

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('role', e.target.value);
  };

  const registrationFormSubmit: SubmitHandler<TAddNewClient> = async (data) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/registration`,
        {
          email: data.email,
          password: data.password,
          role: data.role,
        },
      );

      toast.success('New client was successfully added.');
      reset();
      replace(asPath);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <div className="relative max-w-loginContainer mx-auto w-full px-6 text-black py-10 h-[370px] bg-grayStroke-100 bg-opacity-[0.05] rounded-md border border-grayStroke-80">
      <div className="text-center border-b border-grayStroke-100 border-opacity-20 pb-5 mb-7">
        <h3 className="mb-2 font-semibold text-2xl">New Client</h3>
      </div>
      <button onClick={closeModal} className="w-5 h-5 absolute right-2 top-2">
        <img src="/icons/close-gray-icon.svg" alt="close btn" />
      </button>
      <form onSubmit={handleSubmit(registrationFormSubmit)}>
        <div className="flex flex-col justify-center items-stretch gap-6">
          <label className="relative">
            <input
              className={clsx(
                'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20',
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
          <label className="relative">
            <input
              className={clsx(
                'w-full py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20',
                errors.password ? 'border-mainRed outline-mainRed' : null,
              )}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required!',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 chars',
                },
              })}
            />
            {errors.password ? (
              <span className="absolute left-1 -top-3 text-mainRed text-xs10">
                * {errors.password.message}
              </span>
            ) : null}
          </label>
          <div className="flex items-center justify-center gap-10">
            <label className="flex items-center gap-1 text-s14">
              <input
                type="radio"
                value="client"
                onChange={handleRoleChange}
                checked
              />
              Client
            </label>
            <label className="flex items-center gap-1 text-s14">
              <input type="radio" value="admin" onChange={handleRoleChange} />
              Admin
            </label>
          </div>
          <Button
            type="submit"
            classNameModificator="bg-mainBlue text-white text-sm14 hover:bg-blueHover transition-all duration-200"
          >
            Add New Client
          </Button>
        </div>
      </form>
    </div>
  );
};
