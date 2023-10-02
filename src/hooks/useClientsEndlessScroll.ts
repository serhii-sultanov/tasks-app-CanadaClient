import { getSession } from 'next-auth/react';
import type { TClientsResponse, TUser } from '@/types/types';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useClientsEndlessScroll = (
  setClients: Dispatch<SetStateAction<TUser[]>>,
) => {
  const [hasMore, setHasMore] = useState(true);
  const [newPageNum, setNewPageNum] = useState(2);

  const getMoreClients = async () => {
    try {
      const session = await getSession();
      const response: TClientsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/clients?page=${newPageNum}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      setClients((prev) => [...prev, ...response.data.clientsPerPage]);
      setNewPageNum((prev) => prev + 1);
    } catch (err) {
      toast.error('Error when load more clients');
    }
  };

  return {
    getMoreClients,
    hasMore,
    setHasMore,
  };
};
