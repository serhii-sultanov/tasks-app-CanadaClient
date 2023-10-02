import { useSession } from 'next-auth/react';
import { FC } from 'react';

export const Reminder: FC = () => {
  const { data } = useSession();
  if (data?.user.role === 'client') {
    return null;
  }
  return (
    <div className="flex-1">
      <h3 className="text-grayStroke-100 font-semibold text-lg">
        Reminder frequency
      </h3>
      <form>
        <div></div>
      </form>
    </div>
  );
};
