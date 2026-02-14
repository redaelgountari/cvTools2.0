import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { mdb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as any;

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        const db = await mdb();

        const result = await db.collection("users").updateOne(
            { email: email },
            { $set: { hasSeenTutorial: true } }
        );

        if (result.acknowledged) {
            return NextResponse.json({ message: "Tutorial status updated" }, { status: 200 });
        } else {
            throw new Error("Update not acknowledged");
        }

    } catch (error) {
        console.error("Error updating tutorial status:", error);
        return NextResponse.json({
            error: "Failed to update tutorial status",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
