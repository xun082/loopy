'use client';

import Link from 'next/link';

import Theme from './theme';
import Notification from './notification';
import SearchInput from './searchInput';
import UserCenter from './userCenter';

import Button from '@/components/common/button';

interface MenuItem {
  name: string;
  href: string;
  ariaLabel?: string;
}

export const menus: MenuItem[] = [
  {
    name: '首页',
    href: '/',
    ariaLabel: '前往稀土掘金首页',
  },
  {
    name: '交流',
    href: '/discussion',
    ariaLabel: '前往社区交流区',
  },
  {
    name: '活动',
    href: '/events',
    ariaLabel: '查看稀土掘金活动',
  },
  {
    name: '资讯',
    href: '/news',
    ariaLabel: '浏览技术资讯',
  },
  {
    name: '工具',
    href: '/tools',
    ariaLabel: '开发者工具集',
  },
];

function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl min-w-24 font-bold text-blue-600 dark:text-white hover:opacity-80 transition-opacity"
      aria-label="稀土掘金 - 首页"
    >
      稀土掘金
    </Link>
  );
}

function Navigation() {
  return (
    <nav className="flex-1" aria-label="主导航">
      <ul className="flex items-center justify-center gap-16 relative">
        {menus.map((menu) => (
          <li key={menu.name}>
            <Link
              href={menu.href}
              className="hover:text-primary transition-colors"
              aria-label={menu.ariaLabel}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Actions() {
  const handleSearch = (value: string) => {
    console.log('搜索:', value);
  };

  return (
    <div className="flex-1">
      <ul className="flex items-center justify-end gap-4">
        <li className="flex-1">
          <SearchInput
            className="h-8 flex-1 transition-all duration-200 ease-in-out"
            placeholder="探索稀土掘金"
            onSearch={handleSearch}
            aria-label="搜索稀土掘金内容"
          />
        </li>
        <li>
          <Link href="/creator" passHref>
            <Button variant="default" size="sm" className="ml-2" aria-label="进入创作者中心">
              创作者中心
            </Button>
          </Link>
        </li>
        <li>
          <Theme />
        </li>
        <li>
          <Notification />
        </li>
        <li>
          <UserCenter />
        </li>
      </ul>
    </div>
  );
}

function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="flex items-center justify-between w-full h-16 px-4 max-w-screen-2xl mx-auto">
        <Logo />
        <Navigation />
        <Actions />
      </div>
    </header>
  );
}

export default Header;
