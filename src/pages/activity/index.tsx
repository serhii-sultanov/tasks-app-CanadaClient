import { ActivityItem } from '@/components/activity/ActivityItem';
import { FC } from 'react';

const Activity: FC = () => {
  return (
    <section className={'pt-5 pb-10 max-w-7xl mx-auto'}>
      <div className="max-w-container mx-auto w-full px-12">
        <h1 className="text-md26 font-medium text-black mb-8">Activity</h1>
        <div className="flex flex-col bg-grayStroke-50 border border-grayStroke-50 rounded-md">
          {/* Map data with activity */}
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
        </div>
      </div>
    </section>
  );
};

export default Activity;
