import { Auth } from '@/components/ui/Auth';
import { FC, useState } from 'react';

const Home: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <section className={'pt-5 pb-10 flex items-center justify-center h-screen'}>
      <Auth isLogin={isLogin} setIsLogin={() => setIsLogin((prev) => !prev)} />
    </section>
  );
};

export default Home;
