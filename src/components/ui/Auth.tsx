import type { TUserLoginInfo } from '@/types/auth';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from './Button';
import type { TError } from '@/types/types';

type AuthProps = {
  isLogin: boolean;
  setIsLogin: () => void;
};

export const Auth: FC<AuthProps> = ({ isLogin, setIsLogin }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserLoginInfo>();

  const { replace, asPath } = useRouter();

  const loginFormSubmit: SubmitHandler<TUserLoginInfo> = async (
    credentials,
  ) => {
    if (isLogin) {
      const res = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });

      if (res?.ok) {
        reset();
        replace(asPath);
      } else {
        toast.error('Wrong credentials');
      }
    } else {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/registration`,
          credentials,
        )
        .then((resp: AxiosResponse<{ token: string }>) => {
          if (resp.data.token) {
            toast.success('Registration success.');
            setIsLogin();
          }
        })
        .catch((data: AxiosError<TError>) =>
          toast.error(data.response?.data?.message),
        );
    }
  };

  return (
    <div className="relative max-w-loginContainer mx-auto w-full px-6 text-black py-10 h-[430px] bg-grayStroke-100 bg-opacity-[0.05] rounded-md border border-grayStroke-80">
      <div className="text-center border-b border-grayStroke-100 border-opacity-20 pb-5 mb-7">
        <h3 className="mb-2 font-semibold text-2xl">
          {isLogin ? 'Sign In' : 'Create account'}
        </h3>
        <p className="text-sm16 text-grayStroke-70">
          Start doing things for free in an instant
        </p>
      </div>
      <form onSubmit={handleSubmit(loginFormSubmit)}>
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
          <Button
            type="submit"
            classNameModificator="bg-mainBlue text-white text-sm14 hover:bg-blueHover transition-all duration-200"
          >
            {isLogin ? 'Sign In' : 'Create account'}
          </Button>
        </div>
      </form>
      <Button
        onClick={setIsLogin}
        classNameModificator="text-xs14 text-mainBLue mt-4 mb-2 transition-all duration-20"
      >
        {isLogin ? "You don't have an account?" : 'Already have an account?'}
      </Button>
      {isLogin ? null : (
        <p className="text-xs12 text-center text-grayStroke-70 mb-4">
          By clicking 'Create Account' you agree to out{' '}
          <a href="#" className="text-mainBLue">
            Terms of Use
          </a>
        </p>
      )}
    </div>
  );
};
