import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function Home() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">HIZET CMS</h1>
        <div className="mb-4">
          <Link href="/admin.html" className="text-blue-600 hover:underline">
            Admin Dashboard →
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
        {articles?.map((article: any) => (
          <article key={article.id} className="mb-6 p-4 border rounded">
            <h3 className="text-xl font-bold">{article.title}</h3>
            <p className="text-gray-600">{article.excerpt}</p>
            <Link 
              href={`/articles/${article.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
