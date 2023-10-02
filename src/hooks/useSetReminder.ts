import type { TTaskReminder } from '@/types/types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type TReminderForm = {
  dayBetween: string;
  reminderId?: string | null;
};

export const useSetReminder = (reminder: TTaskReminder[]) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TReminderForm>({
    defaultValues: {
      dayBetween: reminder[0]?.dayBetween ? reminder[0].dayBetween : '',
      reminderId: reminder[0]?._id ? reminder[0]._id : null,
    },
  });

  const handleUpdate = async (dayBetween: TReminderForm) => {
    try {
      const session = await getSession();
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/taskReminder`,
        dayBetween.reminderId
          ? dayBetween
          : { dayBetween: dayBetween.dayBetween },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      toast.success('Reminder frequency has been updated.');
      router.replace(router.asPath);
    } catch (err) {
      toast.error('Reminder frequency update error. Try again.');
    }
  };

  return {
    handleSubmit,
    handleUpdate,
    register,
    errors,
    isSubmitting,
  };
};
