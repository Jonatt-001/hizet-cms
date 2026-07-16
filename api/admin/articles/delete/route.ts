import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await req.formData();
  const id = formData.get('id') as string;
  await supabase.from('articles').delete().eq('id', id);
  revalidatePath('/');
  return NextResponse.redirect(new URL('/admin', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}