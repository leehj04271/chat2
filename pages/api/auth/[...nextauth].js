import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
import { getClient } from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";

dotenv.config();

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    session: {
    strategy: "jwt",
  },

    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
              return profile.email_verified 
            }
            return true // Do different verification for other providers that don't have `email_verified`
          },
        
        
          async session({session, token, user}) {
            // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.accessToken
    session.user.id = token.id

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
