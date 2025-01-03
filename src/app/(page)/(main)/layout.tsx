'use client';

import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav className="space-y-4">
          <Link href="/ " className="block">
            推荐
          </Link>
          <Link href="/frontend" className="block">
            前端
          </Link>
          <Link href="/backend" className="block">
            后端
          </Link>
          <Link href="/android" className="block">
            Android
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
