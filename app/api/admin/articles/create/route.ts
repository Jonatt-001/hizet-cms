import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { categoryId, ...articleData } = body;

  const { data, error } = await supabase
    .from('articles')
    .insert({
      ...articleData,
      published_at: articleData.published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (categoryId) {
    await supabase.from('article_categories').insert({ 
      article_id: data.id, 
      category_id: categoryId 
    });
  }

  return NextResponse.json(data);
}
