import { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { ROUTE } from '@/utils/routes';

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const session = await getSession(ctx);

  if (session?.user.role !== 'admin') {
    return {
      redirect: {
        destination: `${ROUTE.USER_TASK_LIST}/${session?.user.id}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: ROUTE.ACTIVITY,
        permanent: false,
      },
    };
  }
};

const Task: FC = () => {
  return <></>;
};

export default Task;
