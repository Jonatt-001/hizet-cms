'use client';

import { useState, useEffect } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch('/api/admin/categories');
    setCategories(await res.json());
  };

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, slug: newSlug }),
    });
    setNewName(''); setNewSlug('');
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
      <form onSubmit={addCategory} className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium mb-4">Add New Category</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg" placeholder="Category name" />
          <input type="text" required value={newSlug} onChange={(e) => setNewSlug(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg" placeholder="category-slug" />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Category</button>
      </form>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{cat.slug}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => deleteCategory(cat.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
