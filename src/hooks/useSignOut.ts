import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

export const useSignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
      router.replace(router.asPath);
    } catch (err) {
      toast.error('Log out error. Try again.');
    }
  };

  return { handleSignOut };
};
