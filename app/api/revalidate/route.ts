import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const secret = req.headers.get('x-webhook-secret');

  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (body.slug) {
    revalidatePath(`/articles/${body.slug}`);
  }

  revalidatePath('/');

  if (body.category_slug) {
    revalidatePath(`/category/${body.category_slug}`);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
