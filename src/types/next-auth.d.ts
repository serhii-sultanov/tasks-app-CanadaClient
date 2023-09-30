import NextAuth, { DefaultSession, User, AuthOptions } from 'next-auth';
import { TLogin } from './auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: TLogin;
  }

  interface User extends TLogin {}
}

declare module 'next-auth/jwt' {
  interface JWT extends TLogin {}
}
