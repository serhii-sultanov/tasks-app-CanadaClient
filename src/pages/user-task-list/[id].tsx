import { ContentBox } from '@/components/clients/ContentBox';
import { TaskItem } from '@/components/user-task-list/TaskItem';
import { fetchClient } from '@/utils/fetchClientAcc';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  try {
    const queryId = ctx?.query.id;
    const queryClient = new QueryClient();
    const session = await getSession(ctx);
    await queryClient.prefetchQuery(['client'], () =>
      fetchClient(queryId as string, session),
    );

    const dehydratedState = dehydrate(queryClient);
    return {
      props: {
        dehydratedState,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

const ClientPage: FC = () => {
  const { query } = useRouter();
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: ['client'],
    queryFn: () => fetchClient(query.id as string, session),
    enabled: !!query.id && !!session,
  });

  if (!data) {
    return (
      <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md font-medium text-center">
        Client data fetching failed. Try to reload page.
      </div>
    );
  }

  return (
    <section className={'pt-5 pb-10 max-w-7xl mx-auto'}>
      <div className="max-w-container mx-auto w-full px-12 pt-5 max-md:px-0">
        <div className="max-md:max-w-loginContainer max-md:mx-auto max-md:w-full mb-4">
          {session?.user.role !== 'admin' ? (
            <>
              <h1 className="text-black text-center text-3xl font-semibold mb-4 max-md:text-xl max-md:mb-2">
                Welcome to Client Portal
                {data?.firstName ? <span>, {data?.firstName}</span> : null}
              </h1>
              <p className="text-sm16 text-black text-center max-md:text-s14">
                We need to get some additional information from you. Please
                complete these tasks.
              </p>
            </>
          ) : (
            <h1 className="text-black text-center text-3xl font-semibold mb-4 max-md:text-xl max-md:mb-2">
              {data.firstName ? (
                <span>
                  Welcome to <span>{data.firstName}</span>'s client portal
                </span>
              ) : (
                'Welcome to Client Portal'
              )}
            </h1>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-black text-center mb-4">
          {session?.user.role !== 'admin' ? 'Your tasks' : 'Client tasks'}
        </h2>
        {data.taskLists.length ? (
          <div className="flex flex-col gap-10 max-sm:gap-6">
            {data?.taskLists.map((taskList) => (
              <ContentBox
                title={taskList.task_list_name}
                key={taskList._id}
                userId={data._id}
                taskListId={taskList._id}
              >
                {taskList.task_list.length ? (
                  taskList.task_list.map((task) => (
                    <TaskItem userId={data._id} key={task._id} task={task} />
                  ))
                ) : (
                  <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md font-medium text-center">
                    At the moment, there are no new Tasks for you.
                  </div>
                )}
              </ContentBox>
            ))}
          </div>
        ) : (
          <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md font-medium text-center">
            At the moment, there are no new Tasks for you.
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientPage;
