import { FC } from 'react';
import { DotsButton } from '../ui/DotsButton';
import { ActionButton } from '../ui/ActionButton';

type ContentBoxProps = {
  children: React.ReactNode;
};

const onClick = () => {
  ('');
};

export const ContentBox: FC<ContentBoxProps> = ({ children }) => {
  return (
    <div className="w-full bg-grayBg rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-black font-medium">Evaluation</h2>
        <DotsButton>
          <ActionButton type="edit" onClick={onClick}>
            Edit
          </ActionButton>
          <ActionButton type="delete" onClick={onClick}>
            Delete
          </ActionButton>
        </DotsButton>
      </div>
      {children}
    </div>
  );
};
