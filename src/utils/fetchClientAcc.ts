import type { TUser } from '@/types/types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type TClientResponse = {
  data: TUser;
};

export const fetchClient = async (clientId: string, session: any) => {
  try {
    const response: TClientResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/account/${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    toast.error('Error fetching client');
  }
};
