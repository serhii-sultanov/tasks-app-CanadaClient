import type { TOpenTaskResponse, TUser } from '@/types/types';
import { FC, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import { ROUTE } from '@/utils/routes';
import axios from 'axios';
import { useOpenTasksEndlessScroll } from '@/hooks/useOpenTasksEndlessScroll';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserOpenTask } from '@/components/open-tasks/UserOpenTask';

type OpenTasksProps = {
  clientsPerPage: TUser[];
  pageNum: number;
  totalClients: number;
};

export const getServerSideProps: GetServerSideProps<OpenTasksProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);

  if (session?.user.role !== 'admin') {
    return {
      redirect: {
        destination: ROUTE.USER_TASK_LIST,
        permanent: false,
      },
    };
  }

  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  try {
    const response: TOpenTaskResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/opentasks/clients?page=${pageNum}&pageSize=10`,
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

const OpenTasks: FC<OpenTasksProps> = ({ clientsPerPage, totalClients }) => {
  const [openTasks, setOpenTasks] = useState(clientsPerPage);
  const { getMoreOpenTasks, hasMore, setHasMore } =
    useOpenTasksEndlessScroll(setOpenTasks);

  useEffect(() => {
    setHasMore(totalClients! > openTasks.length ? true : false);
  }, [openTasks]);

  return (
    <section className={'pt-5 pb-10 max-w-7xl mx-auto'}>
      <div className="max-w-container mx-auto w-full px-12 pt-5 max-md:px-0">
        <h1 className="text-md26 font-medium text-black mb-8">Open tasks</h1>
        {openTasks?.length ? (
          <InfiniteScroll
            dataLength={openTasks.length}
            next={getMoreOpenTasks}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {openTasks.map((task) => (
              <UserOpenTask user={task} key={task._id} />
            ))}
          </InfiniteScroll>
        ) : (
          <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md">
            Open tasks empty
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenTasks;
