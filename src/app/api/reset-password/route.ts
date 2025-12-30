// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { mdb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    
    if (!requestBody?.email || !requestBody?.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { email, password } = requestBody;

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const db = await mdb();

    // Check if OTP was verified
    const otpRecord = await db.collection("password_resets").findOne({ 
      email,
      verified: true 
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Please verify your OTP first" },
        { status: 400 }
      );
    }

    // Check if verification is still valid (within 30 minutes)
    const verificationExpiry = new Date(otpRecord.verifiedAt);
    verificationExpiry.setMinutes(verificationExpiry.getMinutes() + 30);
    
    if (new Date() > verificationExpiry) {
      await db.collection("password_resets").deleteOne({ email });
      return NextResponse.json(
        { error: "Verification expired. Please start over" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await db.collection("users").updateOne(
      { email },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        } 
      }
    );

    // Delete the OTP record
    await db.collection("password_resets").deleteOne({ email });

    return NextResponse.json(
      { 
        message: "Password reset successfully",
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}