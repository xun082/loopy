'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Dropdown from '@/components/common/dropdown';

export interface IList {
  id: number;
  title: string;
  to: string;
}

export const notifications: IList[] = [
  {
    id: 1,
    title: '评论',
    to: '/notification',
  },
  {
    id: 2,
    title: '赞和收藏',
    to: '/notification/digg',
  },
  {
    id: 3,
    title: '新增粉丝',
    to: '/notification/follow',
  },
  {
    id: 4,
    title: '系统通知',
    to: '/notification/system',
  },
];

function NotificationContent() {
  return (
    <div className="py-2">
      {notifications.map((item) => (
        <Link
          key={item.id}
          href={item.to}
          className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default function Notification() {
  const router = useRouter();

  return (
    <Dropdown
      trigger={
        <Bell
          size={24}
          className="cursor-pointer stroke-gray-400 hover:stroke-slate-700"
          onClick={() => router.push('/notification')}
        />
      }
      content={<NotificationContent />}
      contentClassName="w-[160px]"
    />
  );
}
