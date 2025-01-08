'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Eye,
  Flame,
  Server,
  Layout,
  Smartphone,
  Apple,
  Brain,
  Wrench,
  Code2,
  BookOpen,
  Trophy,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { path: '/follow', label: '关注', icon: Eye },
    { path: '/', label: '综合', icon: Flame },
    { path: '/backend', label: '后端', icon: Server },
    { path: '/frontend', label: '前端', icon: Layout },
    { path: '/android', label: 'Android', icon: Smartphone },
    { path: '/ios', label: 'iOS', icon: Apple },
    { path: '/ai', label: '人工智能', icon: Brain },
    { path: '/tools', label: '开发工具', icon: Wrench },
    { path: '/life', label: '代码人生', icon: Code2 },
    { path: '/read', label: '阅读', icon: BookOpen },
    { path: '/ranking', label: '排行榜', icon: Trophy },
  ];

  return (
    <div className="flex justify-center min-h-[calc(100vh-60px)]">
      <div className="w-full flex justify-center gap-5 px-4 py-4">
        {/* 左侧导航栏 */}
        <div className="w-[240px] shrink-0">
          <div className="fixed w-[240px] top-[76px]">
            <div className="bg-white dark:bg-[#1d2127] rounded-lg shadow-sm">
              <nav className="py-4">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`flex items-center px-4 py-[10px] text-[14px] transition-colors ${
                      pathname === path
                        ? 'text-[#1e80ff] bg-[#e8f3ff] dark:bg-[#1d2127] dark:text-white'
                        : 'text-[#86909c] hover:text-[#1e80ff] hover:bg-[#f4f5f5] dark:hover:bg-[#2d2d2d] dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3 shrink-0" />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* 中间内容区 */}
        <main className="w-[720px] min-h-[calc(100vh-92px)] rounded-lg shadow-sm">{children}</main>

        {/* 右侧边栏 */}
        <div className="w-[240px] shrink-0">
          <div className="fixed w-[240px] top-[76px]">
            <div className="bg-white dark:bg-[#1d2127] rounded-lg p-4 mb-4 shadow-sm">
              <h3 className="text-[#1d2129] dark:text-white font-medium mb-2">晚上好！</h3>
              <p className="text-[#86909c] text-sm">点亮在社区的第一天</p>
            </div>

            <div className="bg-white dark:bg-[#1d2127] rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1d2129] dark:text-white font-medium">文章榜</h3>
                <button className="text-sm text-[#86909c] hover:text-[#1e80ff]">换一换</button>
              </div>
              {/* 文章列表可以在这里添加 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
