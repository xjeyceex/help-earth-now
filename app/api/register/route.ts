import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    console.log('password:', password);

    // Insert user data into the "users" table using Prisma
    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        updateDate: new Date(),
      },
    });

    return NextResponse.json(
      { message: "User Registered", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);

    return NextResponse.json(
      { message: "An Error has occurred" },
      { status: 500 }
    );
  }
}
