import { Auth } from '@/components/ui/Auth';
import { ROUTE } from '@/utils/routes';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const redirectDestination =
    session?.user.role === 'admin'
      ? ROUTE.ACTIVITY
      : `${ROUTE.USER_TASK_LIST}/${session?.user.id}`;

  if (session) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

const Home: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <section className={'pt-5 pb-10 flex items-center justify-center h-screen'}>
      <Auth isLogin={isLogin} setIsLogin={() => setIsLogin((prev) => !prev)} />
    </section>
  );
};

export default Home;
