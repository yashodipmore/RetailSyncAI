import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoClient } from 'mongodb';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('NextAuth signIn callback - provider:', account?.provider);
      console.log('NextAuth signIn callback - user:', user?.email);
      
      if (account?.provider === 'google') {
        try {
          // Skip MongoDB for now - just allow sign in
          console.log('Google sign in successful for:', user.email);
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return true;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback - url:', url, 'baseUrl:', baseUrl);
      // Always go to editor after successful auth
      return `${baseUrl}/editor`;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
