'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    fetch(`/api/admin/articles/${params.id}`).then(r => r.json()).then(data => setFormData(data));
  }, [params.id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/articles/${params.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) router.push('/admin');
  };
  if (!formData.title) return <div>Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" />
        <textarea rows={10} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-2 border rounded font-mono" />
        <div className="flex items-center gap-2"><input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} /><label>Published</label></div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}