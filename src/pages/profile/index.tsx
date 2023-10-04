import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { Reminder } from '@/components/profile/Reminder';
import { UpdatePassword } from '@/components/profile/UpdatePassword';
import { Loader } from '@/components/ui/Loader';
import type { TTaskReminder, TUserProfile } from '@/types/types';
import axios from 'axios';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';

type TProfileProps = {
  data: TUserProfile | null;
  reminder?: TTaskReminder[] | null;
};
type TReminderProps = {
  data: TTaskReminder[];
};

export const getServerSideProps: GetServerSideProps<TProfileProps> = async (
  ctx,
) => {
  try {
    const session = await getSession(ctx);
    const response: TProfileProps = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/account/${session?.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    const data = response.data;

    if (session?.user.role === 'client') {
      return {
        props: {
          data,
        },
      };
    }

    const reminder: TReminderProps = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin/taskReminder`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );

    return {
      props: {
        data,
        reminder: reminder.data,
      },
    };
  } catch (err) {
    return {
      props: { data: null, reminder: null },
    };
  }
};

const Profile: FC<TProfileProps> = ({ data, reminder }) => {
  if (!data) {
    return <Loader />;
  }
  const { businessName, firstName, lastName, email, clientBackground } = data;

  return (
    <div className="pb-10 pt-5">
      <div className="flex gap-4 items-center mb-8 pb-8 border-b border-grayStroke-100 border-opacity-20">
        <div
          className={clsx(
            'min-w-profileDesktop min-h-profileDesktop rounded-full flex justify-center items-center uppercase text-4xl font-semibold max-sm:text-lg max-sm:min-w-profileMobile max-sm:min-h-profileMobile text-white',
          )}
          style={{
            backgroundColor: clientBackground,
          }}
        >
          {firstName || lastName
            ? `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`
            : email.slice(0, 2)}
        </div>
        <div>
          <h3 className="text-black font-semibold text-3xl max-sm:text-lg">
            {firstName} {lastName}
          </h3>
          <h4 className="text-grayStroke-100 font-medium text-lg max-sm:text-sm16">
            {businessName}
          </h4>
          <p className="text-grayStroke-70 max-sm:text-s14">{email}</p>
        </div>
      </div>
      <ProfileEditForm profile={data} />
      <div className="flex justify-between items-center gap-8 max-sm:flex-col max-sm:items-stretch">
        <UpdatePassword />
        {reminder ? <Reminder reminder={reminder} /> : null}
      </div>
    </div>
  );
};

export default Profile;
