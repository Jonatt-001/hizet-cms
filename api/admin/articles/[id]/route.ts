import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data } = await supabase.from('articles').select('*, categories(id, name)').eq('id', params.id).single();
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { categoryId, ...articleData } = body;
  
  const { data, error } = await supabase
    .from('articles')
    .update({
      ...articleData,
      published_at: articleData.published ? new Date().toISOString() : null,
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('article_categories').delete().eq('article_id', params.id);
  if (categoryId) {
    await supabase.from('article_categories').insert({ article_id: params.id, category_id: categoryId });
  }

  return NextResponse.json(data);
}
