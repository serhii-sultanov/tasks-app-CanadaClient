import { TUser } from '@/types/types';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export const searchUsersByQuery = async (
  q: string,
  signal: AbortSignal,
): Promise<TUser[]> => {
  const session = await getSession();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/search`,
      {
        params: {
          q,
        },
        signal,
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    toast.error('Error when searching clients');
    return [];
  }
};
