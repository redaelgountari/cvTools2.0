// app/api/auth/verify-otp/route.ts
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
    const otpRecord = await db.collection("password_resets").findOne({ 
      email,
      otp 
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await db.collection("password_resets").deleteOne({ email });
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one" },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await db.collection("password_resets").updateOne(
      { email },
      { $set: { verified: true, verifiedAt: new Date() } }
    );

    return NextResponse.json(
      { 
        message: "OTP verified successfully",
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}