import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const body = await req.json(); 
  try {
    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        isActive: body.isActive,
        isAdmin: body.isAdmin, // Include isAdmin field here
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
