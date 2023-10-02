import type { TOpenTaskResponse, TUser } from '@/types/types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useOpenTasksEndlessScroll = (
  setActivity: Dispatch<SetStateAction<TUser[]>>,
) => {
  const [hasMore, setHasMore] = useState(true);
  const [newPageNum, setNewPageNum] = useState(2);

  const getMoreOpenTasks = async () => {
    try {
      const session = await getSession();
      const response: TOpenTaskResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/opentasks/clients?page=${newPageNum}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      setActivity((prev) => [...prev, ...response.data.clientsPerPage]);
      setNewPageNum((prev) => prev + 1);
    } catch (err) {
      toast.error('Error when load more open tasks');
    }
  };

  return {
    getMoreOpenTasks,
    hasMore,
    setHasMore,
  };
};
