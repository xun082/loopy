'use client';

import { CheckCircle2 } from 'lucide-react';

import TabLayout from '@/components/common/tabLayout';
import Button from '@/components/common/button';

export default function NotificationLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: '评论互动', path: '/notification', count: 2 },
    { name: '赞和收藏', path: '/notification/like', count: 1 },
    { name: '新增关注', path: '/notification/follow' },
    { name: '系统通知', path: '/notification/system', count: 100 },
    { name: '私信', path: '/notification/message' },
  ];

  const handleReadAll = () => {
    console.log('标记全部已读');
  };

  const ReadAllButton = (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReadAll}
      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
      className="rounded-full border-[#e5e6eb] text-[#86909c] 
        hover:border-[#1e80ff] hover:text-[#1e80ff] hover:bg-[#1e80ff]/5
        dark:border-gray-700 dark:text-gray-400 
        dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:bg-blue-500/5
        transition-all duration-200"
    >
      全部已读
    </Button>
  );

  return (
    <main className="mt-6">
      <TabLayout navItems={navItems} rightContent={ReadAllButton}>
        {children}
      </TabLayout>
    </main>
  );
}
