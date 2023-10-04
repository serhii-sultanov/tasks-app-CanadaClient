export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/activity',
    '/open-tasks',
    '/clients',
    '/add-new-task',
    '/profile',
    '/user-task-list',
    '/user-task-list/:path*',
    '/task',
    '/task/:path*',
  ],
};
