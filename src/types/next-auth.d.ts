import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            hasSeenTutorial?: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        hasSeenTutorial?: boolean;
    }
}
