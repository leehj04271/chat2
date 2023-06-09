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
 
        callbacks: {
            
               async signIn({ user }) {
            const client = await getClient();

            const sogae = client.db("sogae");

            const usersCollection = sogae.collection("users");

            const existingUser = await usersCollection.findOne({
                email: user.email,
            });

            if (!existingUser) {
                await sogae
                    .collection("users")
                    .insertOne({ email: user.email });
                await client.close();
            } else {
                await client.close();
                //return '/signup'
            }

            return true;
        },

        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return 'https://chat2-beta.vercel.app';
        },
     

      
    },


    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
