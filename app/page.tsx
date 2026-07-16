import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to HIZET CMS
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your modern content management system
        </p>
        <Link 
          href="/admin.html" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block"
        >
          Go to Admin Panel →
        </Link>
      </div>
    </main>
  );
}
