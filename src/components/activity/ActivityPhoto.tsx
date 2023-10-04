import { FC } from 'react';

type ActivityPhotoProps = {
  fullName: string;
  clientBackground: string;
};

export const ActivityPhoto: FC<ActivityPhotoProps> = ({
  fullName,
  clientBackground,
}) => {
  return (
    <div className="flex items-center mr-3">
      <div className="flex items-center justify-center w-9 h-9 bg-mainBlue rounded-full relative z-[2] border-2 border-white">
        <img className="w-6 h-6" src="/icons/comment-icon.svg" alt="comment" />
      </div>
      <div
        className="w-9 h-9 border-2 border-white text-white rounded-full -ml-2.5 font-medium relative z-[1]uppercase flex justify-center items-center text-sm"
        style={{ backgroundColor: clientBackground }}
      >
        {fullName}
      </div>
    </div>
  );
};
