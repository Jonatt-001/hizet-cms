'use client';
import { useState, useEffect } from 'react';
export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  useEffect(() => { fetch('/api/admin/categories').then(r => r.json()).then(setCategories); }, []);
  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, slug }) });
    setName(''); setSlug('');
    fetch('/api/admin/categories').then(r => r.json()).then(setCategories);
  };
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <form onSubmit={add} className="flex gap-2 mb-8">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="p-2 border rounded flex-1" />
        <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" className="p-2 border rounded flex-1" />
        <button className="bg-blue-600 text-white px-4 rounded">Add</button>
      </form>
      <ul>{categories.map(c => <li key={c.id} className="p-2 border-b">{c.name} ({c.slug})</li>)}</ul>
    </div>
  );
}