import { ContentBox } from '@/components/clients/ContentBox';
import { ContentItem } from '@/components/clients/ContentItem';
import { TUser } from '@/types/types';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import { FC, useState } from 'react';

type ClientsProps = {
  clientsPerPage: TUser[];
  pageNum?: number;
  pagesCount?: number;
};

export const getServerSideProps: GetServerSideProps<ClientsProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  try {
    const response = await axios.get<ClientsProps>(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/clients?page=${pageNum}&pageSize=10`,
      { headers: { Authorization: `Bearer ${session?.user.token}` } },
    );
    const pagesCount = Math.ceil(response.data.clientsPerPage.length / 3);
    return {
      props: {
        clientsPerPage: response.data.clientsPerPage,
        pageNum,
        pagesCount,
      },
    };
  } catch (error) {
    return {
      props: { clientsPerPage: [], pageNum, pagesCount: 1 },
    };
  }
};

const Clients: FC<ClientsProps> = ({ pageNum, clientsPerPage, pagesCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className={'pt-5 pb-10'}>
      <div className="max-w-container mx-auto w-full px-12">
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
        <ContentBox title="Evaluation">
          <ContentItem
            name="John Smith"
            email="mamail@gmai.com"
            doneTasks={2}
            allTasks={10}
          ></ContentItem>
          <ContentItem
            name="Emma White"
            email="enmamail@gmai.com"
            doneTasks={3}
            allTasks={6}
          ></ContentItem>
        </ContentBox>
      </div>
    </section>
  );
};

export default Clients;
