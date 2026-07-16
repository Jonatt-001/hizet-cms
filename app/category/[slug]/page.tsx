import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const { data } = await supabase.from('categories').select('slug');
  return data?.map((c) => ({ slug: c.slug })) ?? [];
}

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!category) notFound();

  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories!inner(slug)')
    .eq('categories.slug', params.slug)
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Category: {category.name}
        </h1>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {article.cover_image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.cover_image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles in this category yet.</p>
        )}
      </div>
    </main>
  );
}
