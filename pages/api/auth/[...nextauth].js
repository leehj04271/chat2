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
              const client = await getClient();

            const sogae = client.db("sogae");

            const usersCollection = sogae.collection("users");

            const existingUser = await usersCollection.findOne({
                                                                   email: user.email,
                                                               });

            if (!existingUser) {
                await sogae
                    .collection("users")
                    .insertOne({email: user.email});
                await client.close();


            } else {
                await client.close();
                //return '/signup'

            }

            return true;
        },

        async session({ session, token, user }) {
           session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.nickname = "nicknamee";

            const client = await getClient();

            const sogae = client.db("sogae");

            const usersCollection = sogae.collection("users");


            const existingUser = await usersCollection.findOne({
                email: session.user.email,
            });
            await client.close();


            console.log(existingUser, 'hi')

            session.user.profile = existingUser.profile;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
