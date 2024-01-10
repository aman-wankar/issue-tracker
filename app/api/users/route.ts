import prisma from '@/prisma/client';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(users);
}
