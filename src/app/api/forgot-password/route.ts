// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import { mdb } from '@/lib/mongodb';
import crypto from 'crypto';
import { Resend } from 'resend';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    
    if (!requestBody?.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { email } = requestBody;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const db = await mdb();

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    
    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json(
        { 
          message: "If an account exists with this email, an OTP has been sent",
          success: true 
        },
        { status: 200 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await db.collection("password_resets").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt: otpExpiry,
          verified: false,
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    const resend = new Resend("re_i5uLWS2e_Kw5nvbtyaiiEct8Ur5a8D9jQ");

    // CHANGE THIS LINE - use Resend's onboarding email for testing
    await resend.emails.send({
        from: 'onboarding@resend.dev', // Changed from your Gmail
        to: email,
        subject: 'Password Reset OTP',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>Your OTP code is:</p>
            <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
            <p>This code expires in 10 minutes.</p>
            <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
          </div>
        `
    });

    console.log(`OTP for ${email}: ${otp}`);
    
    return NextResponse.json(
      { 
        message: "If an account exists with this email, an OTP has been sent",
        success: true,
        // Remove this in production!
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}