import { getSession } from 'next-auth/react';
import type { ActivityResponse, TActivity } from '@/types/types';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useActivityEndlessScroll = (
  setActivity: Dispatch<SetStateAction<TActivity[]>>,
) => {
  const [hasMore, setHasMore] = useState(true);
  const [newPageNum, setNewPageNum] = useState(2);

  const getMoreActivity = async () => {
    try {
      const session = await getSession();
      const response: ActivityResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/activity?page=${newPageNum}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      setActivity((prev) => [...prev, ...response.data.activityPerPage]);
      setNewPageNum((prev) => prev + 1);
    } catch (err) {
      toast.error('Error when load more activity');
    }
  };

  return {
    getMoreActivity,
    hasMore,
    setHasMore,
  };
};
