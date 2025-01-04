import  dbConnect  from "../../../lib/dbConnect";
import User from "../../../models/user";
import NextAuth, { NextAuthOptions, NextApiHandler } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User as NextAuthUser, Account } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: NextAuthUser, account: Account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await dbConnect();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      return user;
    },
  },
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
