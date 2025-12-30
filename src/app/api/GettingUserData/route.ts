import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { mdb } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        const db = await mdb();
        const data = await db.collection("Resumetl").findOne({ userId });

        if (!data) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.error("Error fetching resume:", error);
        return NextResponse.json({ 
            error: "Failed to fetch resume",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
