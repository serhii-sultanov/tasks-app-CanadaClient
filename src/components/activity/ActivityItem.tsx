import { FC } from 'react';
import { ActivityPhoto } from './ActivityPhoto';
import { ActivityContent } from './ActivityContent';

export const ActivityItem: FC = () => {
  return (
    <div className="bg-white last:mb-0 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md min-h-[100px] border border-grayStroke-50 py-3 px-5 flex justify-start items-center">
      <div className="flex items-center">
        <ActivityPhoto />
        <ActivityContent />
      </div>
    </div>
  );
};
