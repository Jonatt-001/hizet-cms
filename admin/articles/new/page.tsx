'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function NewArticle() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({ slug: '', title: '', excerpt: '', content: '', author_name: '', cover_image: '', meta_title: '', meta_description: '', published: false, categoryId: '' });
  useEffect(() => { fetch('/api/admin/categories').then(r => r.json()).then(setCategories); }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/articles/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) router.push('/admin'); else alert('Error');
  };
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" />
        <input type="text" required placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-2 border rounded" />
        <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          {categories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <textarea rows={10} required placeholder="Content (Markdown)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-2 border rounded font-mono" />
        <div className="flex items-center gap-2"><input type="checkbox" id="pub" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} /><label htmlFor="pub">Publish immediately</label></div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}