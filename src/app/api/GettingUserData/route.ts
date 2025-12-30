import { mdb } from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
    try {
        const db = await mdb();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ 
                error: "Missing userId" 
            }, { status: 400 });
        }

        const resume = await db.collection("Resumetl").findOne({ userId });

        if (!resume) {
            return NextResponse.json({ 
                error: "Resume not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            resume 
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching resume:", error);

        return NextResponse.json({ 
            error: "Failed to fetch resume",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
