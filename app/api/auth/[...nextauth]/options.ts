import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: {
          label: "username",
          placeholder: "your cool username",
          type: "text",
        },
        password: {
          label: "password",
          placeholder: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = { id: "42", name: "Dave", password: "nextauth" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
