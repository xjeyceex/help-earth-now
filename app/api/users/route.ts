import { NextResponse } from 'next/server';
import { prisma } from '@/app/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1; 
  const limit = Number(searchParams.get('limit')) || 10; 

  try {
    const [users, total] = await Promise.all([
      prisma.users.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.users.count(), 
    ]);

    return NextResponse.json({ users, total });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.users.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword, 
        isActive: body.isActive,
        isAdmin: body.isAdmin || false,
        createDate: new Date(), 
        updateDate: new Date(),
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
