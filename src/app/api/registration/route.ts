// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { mdb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const db = await mdb();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      if (existingUser.verified) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        );
      }
      // If unverified, we'll update their password and send a new OTP
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      await db.collection("users").updateOne(
        { email },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );
    } else {
      const newUser = {
        email,
        password: hashedPassword,
        provider: 'credentials',
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection("users").insertOne(newUser);
    }

    // Generate and send OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.collection("registration_otps").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt: otpExpiry,
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    const resend = new Resend("re_i5uLWS2e_Kw5nvbtyaiiEct8Ur5a8D9jQ");

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Account - OTP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verify Your Registration</h2>
          <p>Your OTP code is:</p>
          <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    });

    console.log(`Registration OTP for ${email}: ${otp}`);

    return NextResponse.json(
      {
        message: "OTP sent successfully. Please verify your account.",
        requiresOtp: true,
        email: email
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}