import React, { FC } from 'react';

export const ActivityPhoto: FC = () => {
  return (
    <div className="flex items-center mr-3">
      <div className="flex items-center justify-center w-9 h-9 bg-mainBlue rounded-full relative z-[2]">
        i
      </div>
      <img
        className="w-9 h-9 rounded-full -ml-2 relative z-[1]"
        src="https://pipeline.mediumra.re/assets/img/avatar-female-4.jpg"
        alt=""
      />
    </div>
  );
};
