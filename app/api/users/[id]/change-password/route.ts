import { NextRequest, NextResponse } from 'next/server';
import { hash, compare } from 'bcrypt';
import { prisma } from '@/app/prisma'; 
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; 

  try {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ message: 'Old password and new password are required' }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPasswordCorrect = await compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Incorrect old password' }, { status: 401 });
    }
    const hashedPassword = await hash(newPassword, 10);

    await prisma.users.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ message: 'Error changing password' }, { status: 500 });
  }
}
