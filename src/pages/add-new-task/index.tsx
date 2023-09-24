import { AddTaskForm } from '@/components/ui/AddTaskForm';
import { useRouter } from 'next/router';
import { FC } from 'react';

const AddNewTask: FC = () => {
  const router = useRouter();

  return (
    <section className="pb-12 pt-5 px-5 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto mb-5 text-md20 font-medium">
        <div className="bg-mainBLue text-white flex justify-between items-center gap-3 px-9 py-5 mb-5">
          <h3 className="text-white ">Add New Task</h3>
          <button
            onClick={() => router.back()}
            className="flex justify-center items-center w-8 min-w-[32px] h-8 bg-white bg-opacity-40 rounded-full hover:opacity-75"
          >
            <img className="w-4 h-4" src="/icons/close-icon.svg" alt="close" />
          </button>
        </div>
        <AddTaskForm />
      </div>
    </section>
  );
};

export default AddNewTask;
