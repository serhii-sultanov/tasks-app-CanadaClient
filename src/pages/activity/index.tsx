import { ActivityItem } from '@/components/activity/ActivityItem';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';

type ActivityProps = {
  clientsActivity: any;
  pageNum: number;
  pageCount?: number;
};

export const getServerSideProps: GetServerSideProps<ActivityProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/activity?page=${pageNum}&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    // neeed add TYPES
    // const pagesCount = Math.ceil(.total / 12);
    return {
      props: { clientsActivity: response.data, pageNum, pageCount: 1 },
    };
  } catch (err) {
    return {
      props: { clientsActivity: null, pageNum },
    };
  }
};

const Activity: FC<ActivityProps> = ({
  clientsActivity,
  pageNum,
  pageCount,
}) => {
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
