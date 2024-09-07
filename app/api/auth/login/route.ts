import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Handle POST requests for login
export async function POST(req: Request) {
  try {
    // Parse the request body to get the user's credentials
    const { email, password } = await req.json();

    // Find the user by email in the database
    const user = await prisma.users.findUnique({
      where: { email },
    });

    // If user not found, return 404
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare the entered password with the hashed password in the DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // If password does not match, return an error
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // If login is successful, create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET || 'fdafcd869931a32f1334cc680de53294d8d8e4ed4f8a46ddcd1bf1039d5d97ba',
      { expiresIn: '1h' }
    );

    // Return the token as part of the response
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 });
  }
};