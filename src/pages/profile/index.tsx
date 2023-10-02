import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { Reminder } from '@/components/profile/Reminder';
import { UpdatePassword } from '@/components/profile/UpdatePassword';
import type { TUserProfile } from '@/types/types';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';

type TProfileProps = {
  data: TUserProfile | null;
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
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: { data: null },
    };
  }
};

const Profile: FC<TProfileProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="text-black">
        Empty or invalid data. Try to reload page.
      </div>
    );
  }
  const { businessName, firstName, lastName, email } = data;

  return (
    <div className="pb-10 pt-5">
      <div className="flex gap-4 items-center max-lg:justify-center mb-8 pb-8 border-b border-grayStroke-100 border-opacity-20">
        <div className="w-24 h-24 rounded-full bg-mainBLue flex justify-center items-center uppercase text-4xl font-semibold">
          {firstName || lastName
            ? `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`
            : email.slice(0, 2)}
        </div>
        <div>
          <h3 className="text-black font-semibold text-3xl">
            {firstName} {lastName}
          </h3>
          <h4 className="text-grayStroke-100 font-medium text-lg">
            {businessName}
          </h4>
          <p className="text-grayStroke-70">{email}</p>
        </div>
      </div>
      <ProfileEditForm profile={data} />
      <div className="flex justify-between items-center gap-8 max-sm:flex-col max-sm:items-stretch">
        <UpdatePassword />
        <Reminder />
      </div>
    </div>
  );
};

export default Profile;
