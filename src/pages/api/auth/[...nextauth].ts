import { TLogin } from '@/types/auth';
import { ROUTE } from '@/utils/routes';
import axios, { AxiosResponse } from 'axios';
import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          return null;
        }

        const loginData = await axios
          .post(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/login`,
            credentials,
          )
          .then((resp: AxiosResponse<TLogin>) => resp.data);

        return {
          id: loginData.id,
          email: loginData.email,
          role: loginData.role,
          firstName: loginData.firstName,
          token: loginData.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.name = user.firstName;
      }
      if (user) {
        token.token = user.token;
        token.role = user.role;
        token.id = user.id;
        token.firstName = user.firstName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: ROUTE.HOME,
  },
};

export default NextAuth(authOptions);
