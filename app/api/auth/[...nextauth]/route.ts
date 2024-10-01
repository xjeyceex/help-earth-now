import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    isAdmin?: boolean; // Add isAdmin property
    token?: string; 
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isAdmin?: boolean; // Add isAdmin property
      token?: string; 
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string;
    isAdmin?: boolean; // Add isAdmin property
    accessToken?: string; 
  }
}

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const hostName = process.env.HOSTNAME; 
          const response = await fetch(`${hostName}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Authorization failed:', errorData);
            return null;
          }
      
          const data = await response.json();
          return { id: data.id, email: data.email, token: data.token, isAdmin: data.isAdmin };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      }
      
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
        token.isAdmin = user.isAdmin; // Add isAdmin to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        token: token.accessToken ?? '',
        isAdmin: token.isAdmin ?? false, // Set isAdmin in session
      };
      return session;
    },
  },
});

export { authHandler as GET, authHandler as POST };
