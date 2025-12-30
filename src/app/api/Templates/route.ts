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

        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get('search');
        const type = searchParams.get('type');

        const db = await mdb();
        
        const filter: any = {};
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (type && type !== 'all') {
            filter.type = type;
        }

        const data = await db.collection("WebTemplates").find(filter).toArray();

        if (!data) {
            return NextResponse.json({ error: "Templates not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            data,
            count: data.length 
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching Templates:", error);
        return NextResponse.json({ 
            error: "Failed to fetch templates",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
