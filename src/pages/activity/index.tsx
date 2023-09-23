import { ActivityItem } from '@/components/activity/ActivityItem';
import { AddNewTask } from '@/components/ui/AddNewTask';
import { FC } from 'react';

const Activity: FC = () => {
  return (
    <section className={'pt-5 pb-10 max-w-7xl mx-auto'}>
      <div className="max-w-container mx-auto w-full px-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-md26 font-medium text-black">Activity</h1>
          <div className="text-black bg-white p-2 border rounded-full">
            <p className="text-s14 text-grayStroke-70">Filter activity</p>
          </div>
        </div>
        <AddNewTask />
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
          AA
        </div>
      </div>
    </section>
  );
};

export default Activity;
