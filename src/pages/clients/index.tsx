import { ContentBox } from '@/components/clients/ContentBox';
import { ContentItem } from '@/components/clients/ContentItem';
import { useClientsEndlessScroll } from '@/hooks/useClientsEndlessScroll';
import { TClientsResponse, TUser } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type ClientsProps = {
  clientsPerPage: TUser[];
  pageNum: number;
  totalClients: number;
};

export const getServerSideProps: GetServerSideProps<ClientsProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);

  if (session?.user.role !== 'admin') {
    return {
      redirect: {
        destination: `${ROUTE.USER_TASK_LIST}/${session?.user.id}`,
        permanent: false,
      },
    };
  }

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  try {
    const response: TClientsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/users?page=${pageNum}&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    return {
      props: {
        clientsPerPage: response.data.clientsPerPage,
        pageNum,
        totalClients: response.data.totalClients,
      },
    };
  } catch (err) {
    return {
      props: { clientsPerPage: [], pageNum, totalClients: 1 },
    };
  }
};

const Clients: FC<ClientsProps> = ({ clientsPerPage, totalClients }) => {
  const [clients, setClients] = useState(clientsPerPage);
  const { getMoreClients, hasMore, setHasMore } =
    useClientsEndlessScroll(setClients);

  useEffect(() => {
    setHasMore(totalClients! > clients.length ? true : false);
  }, [clients]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className={'pt-5 pb-10 max-w-7xl mx-auto'}>
      <div className="max-w-container mx-auto w-full px-12 pt-5 max-md:px-0">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-md26 font-medium text-black mr-3">Clients</h1>
            <button
              type="button"
              onClick={openModal}
              className="w-8 h-8 rounded-full bg-grayBg text-grayMedium hover:bg-addBtnHover flex items-center justify-center"
            >
              <img src="/icons/plus-icon.svg" alt="add" className="w-4 h-4" />
            </button>
          </div>
          <div className="text-black bg-white p-2 border rounded-full">
            <p className="text-s14 text-grayStroke-70">Filter tasks</p>
          </div>
        </div>
        {clients.length ? (
          <ContentBox title="Evaluation">
            <InfiniteScroll
              dataLength={clients.length}
              next={getMoreClients}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              {clients.map((client) => (
                <ContentItem key={client._id} client={client} />
              ))}
            </InfiniteScroll>
          </ContentBox>
        ) : (
          <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md">
            Clients list is empty
          </div>
        )}
      </div>
    </section>
  );
};

export default Clients;
