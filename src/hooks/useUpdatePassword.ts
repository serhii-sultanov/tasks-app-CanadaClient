import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type TUpdatePasswordForm = {
  password: string;
};

export const useUpdatePassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUpdatePasswordForm>();

  const handleUpdate = async (updatedData: TUpdatePasswordForm) => {
    try {
      const session = await getSession();
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/password`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      toast.success('Password has been updated.');
      reset();
      router.replace(router.asPath);
    } catch (err) {
      toast.error('Password update error. Try again.');
    }
  };

  return {
    handleUpdate,
    handleSubmit,
    errors,
    isSubmitting,
    register,
  };
};
