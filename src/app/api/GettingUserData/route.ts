import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { mdb } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const { searchParams } = new URL(request.url);
        const history = searchParams.get("history") === "true";

        const db = await mdb();
        if (!db) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        if (history) {
            const data = await db.collection("Resumetl")
                .find({ userId, isCheckpoint: true })
                .sort({ createdAt: -1 })
                .limit(5)
                .toArray();

            return NextResponse.json({ data }, { status: 200 });
        } else {
            const data = await db.collection("Resumetl").findOne({ userId, isActive: true });

            if (!data) {
                // fallback to finding the most recent if none is marked active
                const mostRecent = await db.collection("Resumetl")
                    .find({ userId })
                    .sort({ updatedAt: -1 })
                    .limit(1)
                    .toArray();

                if (mostRecent.length > 0) {
                    return NextResponse.json({ data: mostRecent[0] }, { status: 200 });
                }

                return NextResponse.json({ error: "Resume not found" }, { status: 404 });
            }

            return NextResponse.json({ data }, { status: 200 });
        }

    } catch (error) {
        console.error("Error fetching resume:", error);
        return NextResponse.json({
            error: "Failed to fetch resume",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}