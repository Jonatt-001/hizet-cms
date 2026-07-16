import { checkAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HIZET CMS Admin</h1>
            <p className="text-sm text-gray-600">Manage your content</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">View Site →</Link>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="text-gray-600 hover:text-gray-800 text-sm">Logout</button>
            </form>
          </div>
        </div>
      </header>
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          <Link href="/admin" className="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">Articles</Link>
          <Link href="/admin/articles/new" className="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">New Article</Link>
          <Link href="/admin/categories" className="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600">Categories</Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
