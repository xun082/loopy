'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  path: string;
  count?: number;
}

interface TabLayoutProps {
  navItems: NavItem[];
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function TabLayout({ navItems, children, rightContent }: TabLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-[#e5e6eb] dark:border-gray-700 shadow-sm">
      {/* 顶部导航 */}
      <nav className="flex items-center justify-between border-b border-[#e5e6eb] dark:border-gray-700">
        <div className="flex">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            const isFirst = index === 0;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative px-6 py-3.5 text-sm transition-all duration-200
                  ${isFirst ? 'rounded-tl-xl' : ''}
                  ${
                    isActive
                      ? 'text-[#1e80ff] dark:text-blue-400 font-medium'
                      : 'text-[#86909c] dark:text-gray-400'
                  }
                `}
              >
                <span className="flex items-center gap-1.5">
                  {item.name}
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`inline-flex items-center justify-center min-w-[16px] h-4 px-1 text-xs rounded-full 
                      ${
                        isActive
                          ? 'bg-[#1e80ff] dark:bg-blue-400 text-white'
                          : 'bg-[#f53f3f] dark:bg-red-500 text-white'
                      }`}
                    >
                      {item.count > 99 ? '99+' : item.count}
                    </span>
                  )}
                </span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-200 
                  ${
                    isActive
                      ? 'bg-[#1e80ff] dark:bg-blue-400 scale-x-100'
                      : 'bg-[#1e80ff]/60 dark:bg-blue-400/60 scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </div>
        {rightContent && <div className="mr-5">{rightContent}</div>}
      </nav>

      {/* 内容区域 */}
      <main className="min-h-[300px] p-6">{children}</main>
    </div>
  );
}
