import { FC } from 'react';
import { DotsButton } from '../ui/DotsButton';
import { ActionButton } from '../ui/ActionButton';

type ContentBoxProps = {
  title: string;
  children: React.ReactNode;
};

const onClick = () => {
  ('');
};

export const ContentBox: FC<ContentBoxProps> = ({ title, children }) => {
  return (
    <div className="w-full bg-grayBg rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-black font-medium">{title}</h2>
      </div>
      {children}
    </div>
  );
};
