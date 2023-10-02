export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/activity',
    '/open-tasks',
    '/activity',
    '/clients',
    '/add-new-task',
    '/user-account',
    '/user-task-list',
    '/user-task-list/:path*',
  ],
};
