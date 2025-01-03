'use client';

import Link from 'next/link';

import ThemeSwitcher from './themeSwitcher';
import Notification from './notification';
import SearchInput from './searchInput';
import UserCenter from './userCenter';

export const menus = [
  {
    name: '首页',
    href: '/',
  },
  {
    name: '交流',
    href: '/',
  },
  {
    name: '活动',
    href: '/',
  },
  {
    name: '资讯',
    href: '/',
  },
  {
    name: '工具',
    href: '/',
  },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-4">
      {/* 网站Logo */}
      <Link href="/" className="text-2xl min-w-24 font-bold text-blue-600 dark:text-white">
        稀土掘金
      </Link>
      {/* 菜单栏 */}
      <nav className="flex-1 ">
        <ul className="flex items-center justify-center gap-16 relative">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link href={menu.href}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* 搜索栏与其他操作部分 */}
      <div className="flex-1">
        <ul className="flex items-center justify-end gap-4">
          <li className="flex-1">
            <SearchInput
              className="h-8 flex-1 transition-all duration-200 ease-in-out"
              placeholder="探索稀土掘金"
              onSearch={(value: string) => console.log(value)}
            />
          </li>
          <li>
            <Link href="/creator">
              <button className="ml-2  text-white rounded-md px-4 py-1 bg-blue-500">
                创作者中心
              </button>
            </Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
          <li>
            <Notification />
          </li>
          <li>
            <UserCenter />
          </li>
        </ul>
      </div>
    </header>
  );
}
