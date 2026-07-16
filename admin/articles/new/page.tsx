'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArticle() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    slug: '', title: '', excerpt: '', content: '',
    author_name: '', cover_image: '', meta_title: '', meta_description: '',
    published: false, categoryId: '',
  });

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/articles/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/admin');
    else alert('Error creating article');
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Article title" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="article-slug" />
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Short description..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown) *</label>
          <textarea rows={12} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm" placeholder="# Write in Markdown..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
          <input type="text" value={formData.author_name} onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
          <input type="url" value={formData.cover_image} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="https://example.com/image.jpg" />
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <input type="text" value={formData.meta_title} onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Meta title (optional)" />
            <textarea rows={2} value={formData.meta_description} onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Meta description (optional)" />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="published" checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">Publish immediately</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            {formData.published ? 'Publish' : 'Save Draft'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
        </div>
      </form>
    </div>
  );
}
