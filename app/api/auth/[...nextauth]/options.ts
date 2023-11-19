import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          placeholder: "Enter your email",
          type: "email",
        },
        password: {
          label: "password",
          placeholder: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // check the user is exist
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          return null;
        }
        if (credentials?.password && user.password) {
          const isValid = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (isValid) {
            return user;
          }
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user); yes we are getting the user details after github login
      const isExists = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });
      if (!isExists) {
        // create new user

        const create = await prisma.user.create({
          data: {
            name: user.name as string,
            email: user.email as string,
          },
        });
      }

      return true;
    },
    session({ session, token, user }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
