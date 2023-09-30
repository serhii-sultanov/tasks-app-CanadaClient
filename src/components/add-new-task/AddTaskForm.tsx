import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddClientInput } from '../ui/AddClientInput';
import { AddFilesInput } from '../ui/AddFilesInput';
import { AddTaskListInput } from '../ui/AddTaskListInput';
import { AddTaskTitleInput } from '../ui/AddTaskTitleInput';
import { Button } from '../ui/Button';
import { DescriptionTextArea } from '../ui/DescriptionTextArea';
import { FilesList } from '../ui/FilesList';

type AddInfo = {
  user: string;
  taskTitle: string;
  taskList: string;
  taskDescription: string;
  taskFiles: File[];
};

const data = [
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: ['Housework', 'WatchTV'],
    taskTitle: 'Clean room',
    user: 'Alice',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: ['Housework', 'WatchTV'],
    taskTitle: 'Clean room',
    user: 'Bob',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: ['Housework', 'WatchTV'],
    taskTitle: 'Clean room',
    user: 'Anna',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: ['Housework', 'WatchTV'],
    taskTitle: 'Clean room',
    user: 'John',
  },
  {
    taskDescription: 'ghfghfghfhgfhghgfhgfhfgh',
    taskFiles: [
      {
        lastModified: 1639341501148,
        lastModifiedDate: 'Sun Dec 12 2021 22:38:21 GMT+0200',
        name: 'cat.jpg',
        size: 5605,
        type: 'image/jpeg',
        webkitRelativePath: '',
      },
    ],
    taskList: ['Housework', 'WatchTV'],
    taskTitle: 'Clean room',
    user: 'Ira',
  },
];

// export class CreateTaskDto {
//   @ApiProperty()
//   @IsString()
//   task_title: string;

//   @ApiProperty()
//   user_id: string;

//   @ApiProperty()
//   task_description: string;

//   @ApiProperty()
//   task_list_name: string;
// }

export const AddTaskForm: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddInfo>();
  const { user, taskList, taskFiles, taskTitle } = watch();

  const formSubmit: SubmitHandler<AddInfo> = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex w-full flex-col justify-center gap-6 px-9">
        <AddClientInput
          register={register('user', { required: 'Select a client!' })}
          users={data}
          setValue={setValue}
          error={errors.user?.message}
        />
        <AddTaskListInput
          register={register('taskList', { required: 'Select task list!' })}
          user={data.find((item) => item.user === user)}
          setValue={setValue}
          disabled={!user}
          error={errors.taskList?.message}
        />
        <AddTaskTitleInput
          register={register('taskTitle', { required: 'Select task!' })}
          user={data.find((item) => item.user === user)}
          setValue={setValue}
          disabled={!taskList?.length}
          error={errors.taskTitle?.message}
        />
        <DescriptionTextArea
          register={register('taskDescription')}
          disabled={!taskTitle}
        />
        <AddFilesInput
          register={register('taskFiles')}
          setValue={setValue}
          taskFiles={taskFiles}
          disabled={!user}
        />
        {taskFiles?.length ? (
          <FilesList
            filesList={taskFiles}
            userName={user}
            setValue={setValue}
          />
        ) : null}
        <Button
          type="submit"
          classNameModificator="bg-mainBlue text-sm14 hover:bg-blueHover transition-all duration-200"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
