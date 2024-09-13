import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, 
        updateDate: new Date(),
      },
    });

    return NextResponse.json(
      { message: "User Registered", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);

    // Ensure the error object has a message property
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
};
