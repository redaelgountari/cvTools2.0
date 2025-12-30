import ResumeSchema from '@/lib/ResumeSchema';
import { mdb } from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";
import type { InferSchemaType } from 'mongoose';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
    try {
        type ResumeData = InferSchemaType<typeof ResumeSchema>;

        const { userData, userId } = await request.json();

        const db = await mdb();
        
        if(!userData){
            return NextResponse.json({
                error: "no user data",
            }, { status: 500 });
        }

        let objectId;
        try {
            objectId = userId;
        } catch (error) {
            console.error("no user id:", error);
        
            return NextResponse.json({ 
                error: `no user id : ${userId}`,
                details: error instanceof Error ? error.message : String(error)
            }, { status: 500 });
        }
        
        const resumeToInsert = {
            userId: objectId,
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection("Resumetl").findOneAndUpdate(
            { userId: objectId },
            { $set: resumeToInsert },
            {
                upsert: true,
                returnDocument: 'after'
            }
        );

        if (!result) {
            throw new Error("Failed to create/update resume");
        }

        return NextResponse.json({ 
            message: "Resume saved successfully", 
            resume: result.value
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error saving resume:", error);
        
        return NextResponse.json({ 
            error: "Failed to save resume",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}