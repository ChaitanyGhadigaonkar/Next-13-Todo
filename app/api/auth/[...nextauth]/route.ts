import NextAuth, { getServerSession } from "next-auth";
import { options } from "./options";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

const handler = NextAuth(options);

export { handler as GET, handler as POST };

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, handler);
}
