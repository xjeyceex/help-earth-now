// app/api/candidates/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
    });
    console.log('candidates',candidates)

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates: ", error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
