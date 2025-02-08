import { withAuth } from 'next-auth/middleware';

// Защита всех маршрутов /projects/*
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/projects/:path*'],
};
