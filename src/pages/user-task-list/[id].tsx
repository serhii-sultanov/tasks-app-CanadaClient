import axios from 'axios';
import type { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { TUser } from '@/types/types';

type TClientResponse = {
  data: TUser;
};
type TClientProps = {
  clientData: TUser | null;
};
export const getServerSideProps: GetServerSideProps<TClientProps> = async (
  ctx,
) => {
  try {
    const session = await getSession(ctx);
    const clientId = ctx.params?.id;
    const response: TClientResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/account/${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    return {
      props: {
        clientData: response.data,
      },
    };
  } catch (err) {
    return {
      props: {
        clientData: null,
      },
    };
  }
};

const ClientPage: FC<TClientProps> = ({ clientData }) => {
  if (!clientData) {
    return (
      <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md">
        Client data not found. Try again later.
      </div>
    );
  }
  console.log(clientData);
  return <div>ClientPage</div>;
};

export default ClientPage;
