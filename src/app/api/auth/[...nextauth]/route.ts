import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { mdb } from "@/lib/mongodb";
import userShema from "@/lib/UsersShema";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await mdb();
          const db = await mdb();
          
          const user = await db.collection("users").findOne({ email: credentials.email });
          
          if (!user || !user.password) {
            return null;
          }
          
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!passwordMatch) {
            return null;
          }
          
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await mdb();
        const db = await mdb();

        const email = user.email;
        
        if (!email) {
          return false;
        }
        
        const existingUser = await db.collection("users").findOne({ email });
        
        if (existingUser) {
          if (account?.provider && account.provider !== existingUser.provider) {
            await userShema.updateOne(
              { email },
              { $set: { provider: account.provider } }
            );
          }
          return true;
        }
        
        await userShema.create({
          email,
          provider: account?.provider || 'credentials',
          verified: account?.provider ? true : false,
        });
        
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/Signup",
    error: "/Signup",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };