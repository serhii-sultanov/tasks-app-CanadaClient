import axios from 'axios';
import type { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import { getSession } from 'next-auth/react';
import type { TUser } from '@/types/types';
import { ContentBox } from '@/components/clients/ContentBox';
import { TaskItem } from '@/components/user-task-list/TaskItem';
import { DotsButton } from '@/components/ui/DotsButton';

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

  return (
    <section className={'pt-5 pb-10 max-w-7xl mx-auto'}>
      <div className="max-w-container mx-auto w-full px-12 pt-5 max-md:px-0">
        <div className="max-md:max-w-loginContainer max-md:mx-auto max-md:w-full mb-4">
          <h1 className="text-black text-center text-3xl font-semibold mb-4 max-md:text-xl max-md:mb-2">
            Welcome to Client Portal
            {clientData.firstName ? (
              <span>, {clientData.firstName}</span>
            ) : null}
          </h1>
          <p className="text-sm16 text-black text-center max-md:text-s14">
            We need to get some additional information from you. Please complete
            these tasks.
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-black text-center mb-4">
          Your tasks
        </h2>
        {clientData.taskLists.length ? (
          <div className="flex flex-col gap-10">
            {clientData.taskLists.map((taskList) => (
              <ContentBox
                title={taskList.task_list_name}
                key={taskList._id}
                userId={clientData._id}
                taskListId={taskList._id}
              >
                {taskList.task_list.length ? (
                  taskList.task_list.map((task) => (
                    <TaskItem
                      userId={clientData._id}
                      key={task._id}
                      task={task}
                    />
                  ))
                ) : (
                  <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md font-medium">
                    At the moment, there are no new Tasks for you.
                  </div>
                )}
              </ContentBox>
            ))}
          </div>
        ) : (
          <div className="bg-white p-3 border-2 text-grayStroke-100 rounded-md font-medium">
            At the moment, there are no new Tasks for you.
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientPage;
