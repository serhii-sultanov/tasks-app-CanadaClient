import { AddTaskForm } from '@/components/add-new-task/AddTaskForm';
import { AddFormLayout } from '@/components/layouts/AddFormLayout';
import { AddFormHead } from '@/components/add-new-task/AddFormHead';
import { type TUser } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import axios from 'axios';
import { type GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { type FC } from 'react';

type AddNewTaskProps = {
  users: TUser[];
};

export const getServerSideProps: GetServerSideProps<AddNewTaskProps> = async (
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

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/clients`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );

    return {
      props: { users: response.data },
    };
  } catch (error) {
    return {
      props: { users: [] },
    };
  }
};

const AddNewTask: FC<AddNewTaskProps> = ({ users }) => {
  return (
    <AddFormLayout>
      <AddFormHead title="Add New Task" />
      <AddTaskForm users={users} />
    </AddFormLayout>
  );
};

export default AddNewTask;
