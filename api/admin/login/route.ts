import { login } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const success = await login(password);
  if (success) return NextResponse.json({ ok: true });
  return NextResponse.json({ error: 'Invalid' }, { status: 401 });
}
