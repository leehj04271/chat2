import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
import {getClient} from "@/lib/db";

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


    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
