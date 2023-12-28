import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/utils/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB()
        try {

          const user = await User.findOne({ email: credentials.email.toLowerCase() })
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )

            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error.message)
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account.provider == "github") {
        await connectDB()
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            })

            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error saving user", error)
        }
      }
      if(account?.provider == "google") {
        await connectDB()
        try{
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            })

            await newUser.save();
            return true;
          }
          return true;
        } catch(error) {
          console.log("Error saving user", error)
        }
      }
    }
  }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }