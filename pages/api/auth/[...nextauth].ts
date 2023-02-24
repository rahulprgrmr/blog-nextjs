import { getUserByEmailAndPassword } from "@/prisma/models/users";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
type ICredentials = {
  email?: string;
  password?: string;
  redirect?: boolean;
  csrfToken?: string;
  callbackUrl?: string;
  json?: boolean;
};
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        let credsObj = credentials as ICredentials;
        if (
          !credsObj ||
          !credsObj.email ||
          credsObj.email.length < 1 ||
          !credsObj.password ||
          credsObj.password.length < 1
        ) {
          return null;
        }
        // const user = await getUserByEmailAndPassword(
        //   credsObj.email,
        //   credsObj.password
        // );
        // if (!user || !user.status) {
        //   throw new Error("Invalid credentials");
        // }

        const response = await fetch("http://localhost:3000/api/auth/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credsObj.email,
            password: credsObj.password,
          }),
        });

        if (!response.ok) {
          const error = new Error("Invalid Credentials");
          throw error;
        }

        const data = await response.json();

        const user = data.user;

        if (!user) {
          const error = new Error("Invalid Credentials");
          throw error;
        }

        return user;
      },
      credentials: {},
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
