import { ROUTE } from '@/utils/routes';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useDeleteClient = (clientId: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const hanldeClientDelete = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      router.push(ROUTE.CLIENTS);
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  return {
    hanldeClientDelete,
    isLoading,
  };
};
