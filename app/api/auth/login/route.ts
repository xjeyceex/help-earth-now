import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Handle POST requests for login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid user/password combination" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid user/password combination" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1h' }
    );

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 });
  }
};
