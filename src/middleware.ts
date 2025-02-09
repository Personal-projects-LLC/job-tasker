import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return token?.id != null;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/projects/:path*'],
};
