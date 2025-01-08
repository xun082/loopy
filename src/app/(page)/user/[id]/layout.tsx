'use client';

import { use } from 'react';

import TabLayout from '@/components/common/tabLayout';
import UserProfileHeader from '@/components/business/userProfileHeader';

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const navItems = [
    { name: '帖子', path: `/user/${resolvedParams.id}` },
    { name: '评论', path: `/user/${resolvedParams.id}/comments` },
    { name: '笔记', path: `/user/${resolvedParams.id}/notes` },
    { name: '问答', path: `/user/${resolvedParams.id}/questions` },
    { name: '专栏', path: `/user/${resolvedParams.id}/columns` },
    { name: '资料', path: `/user/${resolvedParams.id}/profile` },
    { name: '收藏', path: `/user/${resolvedParams.id}/collections` },
    { name: '关注', path: `/user/${resolvedParams.id}/following` },
    { name: '粉丝', path: `/user/${resolvedParams.id}/followers` },
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 animate-gradient-xy" />

      <div className="relative max-w-[1160px] mx-auto px-4 z-10">
        <UserProfileHeader params={{ id: resolvedParams.id }} />

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <TabLayout navItems={navItems}>{children}</TabLayout>
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
