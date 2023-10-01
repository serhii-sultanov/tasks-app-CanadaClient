import { ActivityItem } from '@/components/activity/ActivityItem';
import { useActivityEndlessScroll } from '@/hooks/useActivityEndlessScroll';
import type { ActivityResponse, TActivity } from '@/types/types';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type ActivityProps = {
  clientsActivity: TActivity[];
  pageNum: number;
  totalActivity: number;
};

export const getServerSideProps: GetServerSideProps<ActivityProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  try {
    const response: ActivityResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/activity?page=${pageNum}&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );

    return {
      props: {
        clientsActivity: response.data.activityPerPage,
        pageNum,
        totalActivity: response.data.totalActivity,
      },
    };
  } catch (err) {
    return {
      props: { clientsActivity: [], pageNum, totalActivity: 1 },
    };
  }
};

const Activity: FC<ActivityProps> = ({ clientsActivity, totalActivity }) => {
  const [activity, setActivity] = useState(clientsActivity);
  const { getMoreActivity, hasMore, setHasMore } =
    useActivityEndlessScroll(setActivity);

  useEffect(() => {
    setHasMore(totalActivity! > activity.length ? true : false);
  }, [activity]);

  return (
    <section className="pb-10 max-w-7xl mx-auto">
      <div className="max-w-container mx-auto w-full px-12 pt-5">
        <h1 className="text-md26 font-medium text-black mb-8">Activity</h1>
        <InfiniteScroll
          dataLength={activity.length}
          next={getMoreActivity}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {activity.length
            ? activity.map((activity) => (
                <ActivityItem key={activity._id} activity={activity} />
              ))
            : null}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Activity;
