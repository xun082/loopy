'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

function ListItem(props: IList) {
  const { title, to } = props;

  return (
    <div className="w-[120px] p-2 rounded hover:bg-slate-100 cursor-pointer">
      <Link href={to}>{title}</Link>
    </div>
  );
}

export default function Notification() {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Bell
            size={24}
            className="cursor-pointer stroke-gray-400 hover:stroke-slate-700"
            onClick={() => router.push('/notification')}
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-0.5">
            {notifications.map((item) => (
              <ListItem key={item.id} {...item} />
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
