import { toast } from 'react-toastify';
import type { TUserProfile } from '@/types/types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useProfileEdit = (profile: TUserProfile) => {
  const { businessName, email, firstName, lastName, _id } = profile;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserProfile>({
    defaultValues: {
      firstName,
      lastName,
      businessName,
      email,
    },
  });

  const handleUpdate = async (updatedData: TUserProfile) => {
    try {
      const session = await getSession();
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/account/${_id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      toast.success('Profile has been updated.');
      router.replace(router.asPath);
    } catch (err) {
      toast.error('Update profile error');
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    handleUpdate,
  };
};
