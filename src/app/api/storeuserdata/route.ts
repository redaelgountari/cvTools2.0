import ResumeShema from '@/lib/ResumeShema';
import { mdb } from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";
import type { InferSchemaType } from 'mongoose';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const { userData, action } = await request.json();
        const { _id, createdAt, ...userDataWithoutId } = userData || {};

        const db = await mdb();
        if (!db) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        if (action === 'set-active') {
            if (!_id) {
                return NextResponse.json({ error: "No version ID provided for activation" }, { status: 400 });
            }

            // Deactivate all for this user
            await db.collection("Resumetl").updateMany(
                { userId: userId },
                { $set: { isActive: false } }
            );

            // Activate specific one
            const result = await db.collection("Resumetl").updateOne(
                { _id: new ObjectId(_id), userId: userId },
                { $set: { isActive: true, updatedAt: new Date() } }
            );

            return NextResponse.json({
                message: "Version set as active",
                success: result.modifiedCount > 0
            }, { status: 200 });
        }

        if (action === 'create-version') {
            // Always deactivate others first
            await db.collection("Resumetl").updateMany(
                { userId: userId },
                { $set: { isActive: false } }
            );

            // Insert as new active version
            const resumeToInsert = {
                userId: userId,
                ...userDataWithoutId,
                isActive: true,
                isCheckpoint: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const result = await db.collection("Resumetl").insertOne(resumeToInsert);
            const savedResume = await db.collection("Resumetl").findOne({ _id: result.insertedId });

            return NextResponse.json({
                message: "New version created successfully",
                resume: savedResume
            }, { status: 201 });
        }

        if (!userData) {
            return NextResponse.json({ error: "No user data provided" }, { status: 400 });
        }

        if (action === 'save') {
            let filter = {};
            if (_id) {
                filter = { _id: new ObjectId(_id), userId: userId };
            } else {
                // If no _id provided, try to find the currently active one to update
                const activeDoc = await db.collection("Resumetl").findOne({ userId: userId, isActive: true });
                if (activeDoc) {
                    filter = { _id: activeDoc._id };
                } else {
                    // Try to find ANY document for this user to update (avoiding history clutter)
                    const anyDoc = await db.collection("Resumetl").findOne({ userId: userId });
                    if (anyDoc) {
                        filter = { _id: anyDoc._id };
                    } else {
                        // Truly the first version for this user
                        const firstResume = {
                            userId: userId,
                            ...userDataWithoutId,
                            isActive: true,
                            isCheckpoint: true,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };
                        const result = await db.collection("Resumetl").insertOne(firstResume);
                        const saved = await db.collection("Resumetl").findOne({ _id: result.insertedId });
                        return NextResponse.json({ message: "First version created", resume: saved }, { status: 201 });
                    }
                }
            }

            const result = await db.collection("Resumetl").updateOne(
                filter,
                {
                    $set: {
                        ...userDataWithoutId,
                        updatedAt: new Date()
                    }
                }
            );

            const updatedDoc = await db.collection("Resumetl").findOne(filter);
            return NextResponse.json({
                message: "Version updated successfully",
                resume: updatedDoc
            }, { status: 200 });
        }

        if (action === 'delete') {
            if (!_id) {
                return NextResponse.json({ error: "No version ID provided for deletion" }, { status: 400 });
            }

            const result = await db.collection("Resumetl").deleteOne({
                _id: new ObjectId(_id),
                userId: userId
            });

            return NextResponse.json({
                message: "Version deleted successfully",
                success: result.deletedCount > 0
            }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error) {
        console.error("Error saving resume version:", error);

        return NextResponse.json({
            error: "Failed to save resume version",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}