import { AddTaskForm } from '@/components/add-new-task/AddTaskForm';
import { AddFormLayout } from '@/components/layouts/AddFormLayout';
import { AddFormHead } from '@/components/ui/AddFormHead';
import { FC } from 'react';

const AddNewTask: FC = () => {
  return (
    <AddFormLayout>
      <AddFormHead title="Add New Task" />
      <AddTaskForm />
    </AddFormLayout>
  );
};

export default AddNewTask;
