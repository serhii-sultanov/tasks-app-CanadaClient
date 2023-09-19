import { FC } from 'react';
import { Button } from './Button';

type AuthProps = {
  isLogin: boolean;
  setIsLogin: () => void;
};

export const Auth: FC<AuthProps> = ({ isLogin, setIsLogin }) => {
  return (
    <div className="relative max-w-loginContainer mx-auto w-full px-6 text-black py-10 h-[430px] bg-grayStroke-100 bg-opacity-[0.05] rounded-md border border-grayStroke-80">
      <Button
        onClick={setIsLogin}
        classNameModificator="bg-mainGreen absolute top-0 right-0 max-w-[80px] text-xs12"
      >
        {isLogin ? 'Sign Up' : 'Sign In'}
      </Button>
      <div className="text-center border-b border-grayStroke-100 border-opacity-20 pb-7 mb-7">
        <h3 className="mb-2 font-semibold text-2xl">
          {isLogin ? 'Sign In' : 'Create account'}
        </h3>
        <p className="mb-4 text-sm16 text-grayStroke-70">
          Start doing things for free in an instant
        </p>
        <Button classNameModificator="bg-mainBlue text-sm14 flex justify-center items-center gap-2 hover:bg-blueHover transition-all duration-200">
          <span className="block bg-white p-1 rounded-sm">
            {' '}
            <img className="w-5 h-5" src="/icons/google-logo.svg" alt="" />
          </span>
          Continue with Google
        </Button>
      </div>
      <div className="flex flex-col justify-center items-stretch gap-4">
        <input
          className="py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20"
          type="text"
          placeholder="Email Address"
        />
        <input
          className="py-1.5 px-3.5 text-s14 font-medium outline-grayStroke-70 rounded-md border border-grayStroke-100 border-opacity-20"
          type="text"
          placeholder="Password"
        />
        <Button classNameModificator="bg-mainBlue text-sm14 hover:bg-blueHover transition-all duration-200">
          {isLogin ? 'Sign In' : 'Create account'}
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
    </div>
  );
};
