import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    token?: string; 
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token?: string; 
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string;
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
          const hostName = process.env.HOSTNAME
          const response = await fetch(`${hostName}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          const data = await response.json();
      
          if (response.ok && data.token) {

            return { id: data.id, email: data.email, token: data.token };
          } else {
            console.error('Authorization failed:', data);
            return null;
          }
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string, 
        email: token.email as string, 
        token: token.accessToken ?? '', 
      };
      return session;
    },
  },  
});

export { authHandler as GET, authHandler as POST };
