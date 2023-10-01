import type { TActivity } from '@/types/types';
import { convertDynamicDate } from '@/utils/convertDate';
import { downloadFile } from '@/utils/downloadFile';
import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { ActivityPhoto } from './ActivityPhoto';
import { LoadFileButton } from './LoadFileButton';

type ActivityItemProps = {
  activity: TActivity;
};

export const ActivityItem: FC<ActivityItemProps> = ({ activity }) => {
  const {
    activity_files,
    createdAt,
    user_id: { firstName, lastName, email },
    task_id,
    updatedAt,
  } = activity;

  const { formattedDynamicCreatedAt } = useMemo(() => {
    return convertDynamicDate(createdAt, updatedAt);
  }, [createdAt, updatedAt]);

  console.log(activity_files);

  const fullName = firstName || lastName ? `${firstName} ${lastName}` : email;
  return (
    <div className="bg-white last:mb-0 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md border min-h-[100px] border-grayStroke-50 py-3 px-5 flex justify-start items-center max-sm:px-2.5">
      <div className="flex items-center">
        <ActivityPhoto
          fullName={
            firstName || lastName
              ? `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`
              : email.slice(0, 2)
          }
        />
        <div className="grow">
          <h4 className="text-grayStroke-100 max-sm:text-s14">
            <span className="text-black font-medium text-sm16 max-sm:text-s14">
              {fullName}
            </span>{' '}
            commented on{' '}
            <Link
              href={`${ROUTE.USER_TASK_LIST}/${task_id._id}`}
              target="_blank"
              className="text-mainBLue max-sm:text-s14 hover:text-btnBlueHover"
            >
              {task_id.task_title}
            </Link>
          </h4>
          {activity_files.length ? (
            <h4 className="text-grayStroke-100 mb-2 max-sm:text-s14">
              With attached file(s):
            </h4>
          ) : null}
          {activity_files.length ? (
            <div className="flex flex-col items-start">
              {activity_files.map((file) => (
                <LoadFileButton key={file._id} file={file} />
                // <button
                //   className="text-mainBLue text-xs break-words hover:text-btnBlueHover"
                //   key={file._id}

                //   style={{
                //     whiteSpace: 'normal',
                //     overflowWrap: 'break-word',
                //   }}
                // >
                //   {file.file_originalName}
                //   {'  '}-{' '}
                //   <span className="text-grayStroke-100"></span>
                // </button>
              ))}
            </div>
          ) : null}
          <span
            className="text-grayStroke-70 text-s14 first-letter:uppercase block max-sm:text-xs12 mt-1"
            suppressHydrationWarning
          >
            {formattedDynamicCreatedAt}
          </span>
        </div>
      </div>
    </div>
  );
};
