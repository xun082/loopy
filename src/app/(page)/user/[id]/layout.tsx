'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use } from 'react';

import UserProfileHeader from '@/components/business/userProfileHeader';

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const resolvedParams = use(params);

  // 定义导航项
  const navItems = [
    { name: '帖子', path: `/user/${resolvedParams.id}` },
    { name: '评论', path: `/user/${resolvedParams.id}/comment` },
    { name: '笔记', path: `/user/${resolvedParams.id}/note` },
    { name: '问答', path: `/user/${resolvedParams.id}/question` },
    { name: '专栏', path: `/user/${resolvedParams.id}/column` },
    { name: '资料', path: `/user/${resolvedParams.id}/profile` },
    { name: '收藏', path: `/user/${resolvedParams.id}/collection` },
    { name: '关注', path: `/user/${resolvedParams.id}/following` },
    { name: '粉丝', path: `/user/${resolvedParams.id}/follower` },
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 animate-gradient-xy" />

      <div className="relative max-w-[1160px] mx-auto px-4 z-10">
        <UserProfileHeader params={{ id: resolvedParams.id }} />

        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-[#e5e6eb] dark:border-gray-700">
            <nav className="flex text-[#86909c] dark:text-gray-400 border-b border-[#e5e6eb] dark:border-gray-700">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-3 hover:text-gray-900 dark:hover:text-gray-200 ${
                      isActive
                        ? 'text-[#1e80ff] dark:text-blue-400 border-b-2 border-[#1e80ff] dark:border-blue-400 -mb-[1px]'
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <main className="p-4 min-h-[300px] text-gray-900 dark:text-gray-200">{children}</main>
          </div>

          <aside className="w-[300px] shrink-0">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-[#e5e6eb] dark:border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <h2 className="dark:text-gray-200">未开通会员</h2>
                <button className="px-4 py-1 bg-[#18191c] dark:bg-gray-900 text-white rounded-full text-sm">
                  开通会员
                </button>
              </div>
              <p className="text-sm text-[#86909c] dark:text-gray-400 mt-2">
                会员专享项目教程/答疑等服务
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
