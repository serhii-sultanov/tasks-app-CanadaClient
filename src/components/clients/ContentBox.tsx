import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { DotsButton } from '../ui/DotsButton';

type ContentBoxProps = {
  title?: string;
  children: React.ReactNode;
  taskListId?: string;
  userId?: string;
};

export const ContentBox: FC<ContentBoxProps> = ({
  title,
  children,
  taskListId,
  userId,
}) => {
  const [state, setState] = useState(false);
  const session = useSession();
  return (
    <div className="w-full bg-grayBg rounded-lg p-4 flex flex-col gap-4 shadow-md">
      {title ? (
        <div className="flex items-center justify-between">
          {!state ? (
            <h2 className="text-black font-medium">{title}</h2>
          ) : (
            <input value={title} type="text" />
          )}
          {session.data?.user.role === 'admin' ? (
            <DotsButton
              taskListId={taskListId}
              userId={userId}
              setEdit={() => setState((prev) => !prev)}
            />
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
};
