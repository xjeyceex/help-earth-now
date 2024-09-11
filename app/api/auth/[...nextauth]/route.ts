import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    token?: string; // Add the token property
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token?: string; // Add the token property
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string;
    accessToken?: string; // Add the accessToken property
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
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          const data = await response.json();
      
          if (response.ok && data.token) {
            // Return user object with token
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
        token.id = user.id; // This should be a string
        token.email = user.email; // This should be a string
        token.accessToken = user.token; // This could be string or undefined
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string, // Ensure id is treated as a string
        email: token.email as string, // Ensure email is treated as a string
        token: token.accessToken ?? '', // Use an empty string if accessToken is undefined
      };
      return session;
    },
  },  
});

export { authHandler as GET, authHandler as POST };
