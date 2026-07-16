'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    slug: '', title: '', excerpt: '', content: '',
    author_name: '', cover_image: '', meta_title: '', meta_description: '',
    published: false, categoryId: '',
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then(r => r.json()),
      fetch(`/api/admin/articles/${params.id}`).then(r => r.json()),
    ]).then(([cats, article]) => {
      setCategories(cats);
      setFormData({
        slug: article.slug, title: article.title, excerpt: article.excerpt || '',
        content: article.content, author_name: article.author_name || '',
        cover_image: article.cover_image || '', meta_title: article.meta_title || '',
        meta_description: article.meta_description || '', published: article.published,
        categoryId: article.categories?.[0]?.id || '',
      });
      setLoading(false);
    });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/articles/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/admin');
    else alert('Error updating article');
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">Select category</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown) *</label>
          <textarea rows={12} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
          <input type="text" value={formData.author_name} onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
          <input type="url" value={formData.cover_image} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <input type="text" value={formData.meta_title} onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Meta title" />
            <textarea rows={2} value={formData.meta_description} onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Meta description" />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="published" checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">Published</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
        </div>
      </form>
    </div>
  );
}
