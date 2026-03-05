import { NextResponse } from 'next/server';
import { mdb } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();

        if (!requestBody?.email || !requestBody?.otp) {
            return NextResponse.json(
                { error: "Email and OTP are required" },
                { status: 400 }
            );
        }

        const { email, otp } = requestBody;

        const db = await mdb();

        // Find the OTP record
        const otpRecord = await db.collection("registration_otps").findOne({ email, otp });

        if (!otpRecord) {
            return NextResponse.json(
                { error: "Invalid OTP" },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            return NextResponse.json(
                { error: "OTP has expired. Please register again to get a new one." },
                { status: 400 }
            );
        }

        // Update user to verified: true
        const userResult = await db.collection("users").updateOne(
            { email },
            { $set: { verified: true, updatedAt: new Date() } }
        );

        if (userResult.modifiedCount === 0) {
            // It's possible the user was already verified or not found
            return NextResponse.json(
                { error: "Failed to verify user. User not found." },
                { status: 400 }
            );
        }

        // Mark OTP as verified or delete it
        await db.collection("registration_otps").deleteOne({ _id: otpRecord._id });

        return NextResponse.json(
            {
                message: "Account verified successfully",
                success: true
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
