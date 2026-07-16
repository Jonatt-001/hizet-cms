import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function HomePage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">HIZET CMS</h1>
          <p className="text-gray-600 mt-1">Modern content management</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.categories?.map((cat: any) => (
                      <span
                        key={cat.slug}
                        className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    {article.author_name && <span>{article.author_name}</span>}
                    {article.published_at && (
                      <span className="ml-2">
                        • {new Date(article.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles published yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
