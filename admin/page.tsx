import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function AdminDashboard() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
        <Link href="/admin/articles/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Article
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles?.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{article.categories?.[0]?.name || 'Uncategorized'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${article.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(article.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                  <form action="/api/admin/articles/delete" method="POST" className="inline">
                    <input type="hidden" name="id" value={article.id} />
                    <button type="submit" className="text-red-600 hover:text-red-800" onClick={() => confirm('Delete this article?')}>Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!articles || articles.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles yet.</p>
            <Link href="/admin/articles/new" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">Create your first article →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
