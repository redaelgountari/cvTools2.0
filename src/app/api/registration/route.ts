// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { mdb } from '@/lib/mongodb';
import userShema from '@/lib/UsersShema';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

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
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      provider: 'credentials',
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("users").insertOne(newUser);

    if (!result.acknowledged) {
      throw new Error("Failed to create user");
    }

    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          id: result.insertedId.toString(),
          email: email
        }
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