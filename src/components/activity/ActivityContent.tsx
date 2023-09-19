import { FC } from 'react';

export const ActivityContent: FC = () => {
  return (
    <div>
      <h4 className="text-grayStroke-70">
        <span className="text-black font-medium text-sm16">Claire</span>{' '}
        completed the task{' '}
        <span className="text-mainBLue">Set up client chat channel</span>
      </h4>
      <span className="text-grayStroke-70 text-s14">Just now</span>
    </div>
  );
};
