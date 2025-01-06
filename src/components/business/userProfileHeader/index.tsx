'use client';

import Image from 'next/image';
import { Share2, Pencil, User } from 'lucide-react';

interface UserStats {
  rank: string;
  points: number;
  likes: number;
  views: number;
  followers: number;
  following: number;
}

const UserProfileHeader = ({ params }: { params: { id: string } }) => {
  console.log(params);

  const userStats: UserStats = {
    rank: '2.4 万',
    points: 1,
    likes: 0,
    views: 0,
    followers: 0,
    following: 0,
  };

  return (
    <article className="border border-[#e5e6eb] dark:border-gray-700 rounded-2xl bg-white/60 dark:bg-gray-800/80 backdrop-blur-sm mt-4">
      <header className="p-6">
        {/* 用户基本信息区域 */}
        <div className="flex justify-between items-start">
          {/* 用户个人信息 */}
          <section className="flex gap-4">
            <figure className="rounded-full border-2 border-[#1e80ff] dark:border-blue-500 p-1">
              <Image
                src="/user.png"
                alt="Melody's profile picture"
                width={80}
                height={80}
                className="rounded-full"
                priority
              />
            </figure>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <h1 className="text-[#252933] dark:text-gray-100 text-xl">Melody</h1>
                <span
                  className="px-1.5 py-[2px] text-xs border border-[#1e80ff] dark:border-blue-500 text-[#1e80ff] dark:text-blue-400 rounded"
                  aria-label="用户等级"
                >
                  V1
                </span>
              </div>
              <p className="text-[#8a919f] dark:text-gray-400 text-sm mt-2">暂无个人简介</p>
              <div
                className="flex items-center text-[#f7827e] dark:text-red-400 text-sm mt-2"
                aria-label="性别"
              >
                <User className="w-3.5 h-3.5 mr-1 stroke-[1.5]" aria-hidden="true" />
                <span>女</span>
              </div>
            </div>
          </section>

          {/* 操作按钮组 */}
          <aside className="flex items-center gap-3" role="group" aria-label="用户操作">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border border-[#e5e6eb] dark:border-gray-700 hover:bg-[#f4f5f5] dark:hover:bg-gray-700"
              aria-label="分享个人主页"
            >
              <Share2 className="w-4 h-4 text-[#4e5969] dark:text-gray-400" aria-hidden="true" />
            </button>
            <button
              className="flex items-center h-8 px-4 text-sm border border-[#1e80ff] dark:border-blue-500 text-[#1e80ff] dark:text-blue-400 rounded-full hover:bg-[#eaf2ff] dark:hover:bg-blue-900/20"
              aria-label="修改个人资料"
            >
              <Pencil className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
              修改资料
            </button>
          </aside>
        </div>

        {/* 统计数据 */}
        <nav className="flex mt-6 text-sm" aria-label="用户数据统计">
          <dl className="flex">
            <div className="flex items-center">
              <dt className="text-[#252933] dark:text-gray-300 mr-1">排名</dt>
              <dd className="text-[#252933] dark:text-gray-200 font-medium">{userStats.rank}</dd>
            </div>
            <div className="mx-4 text-[#e5e6eb] dark:text-gray-700" aria-hidden="true">
              |
            </div>
            <div className="flex items-center">
              <dt className="text-[#252933] dark:text-gray-300 mr-1">积分</dt>
              <dd className="text-[#252933] dark:text-gray-200 font-medium">{userStats.points}</dd>
            </div>
            <div className="mx-4 text-[#e5e6eb] dark:text-gray-700" aria-hidden="true">
              |
            </div>
            <div className="flex items-center">
              <dt className="text-[#252933] dark:text-gray-300 mr-1">获赞</dt>
              <dd className="text-[#252933] dark:text-gray-200 font-medium">{userStats.likes}</dd>
            </div>
            <div className="mx-4 text-[#e5e6eb] dark:text-gray-700" aria-hidden="true">
              |
            </div>
            <div className="flex items-center">
              <dt className="text-[#252933] dark:text-gray-300 mr-1">浏览</dt>
              <dd className="text-[#252933] dark:text-gray-200 font-medium">{userStats.views}</dd>
            </div>
            <div className="mx-4 text-[#e5e6eb] dark:text-gray-700" aria-hidden="true">
              |
            </div>
            <div className="flex items-center">
              <dt className="text-[#252933] dark:text-gray-300 mr-1">关注</dt>
              <dd className="text-[#252933] dark:text-gray-200 font-medium">
                {userStats.followers}
              </dd>
            </div>
            <div className="mx-4 text-[#e5e6eb] dark:text-gray-700" aria-hidden="true">
              |
            </div>
            <div className="flex items-center">
              <dt className="text-[#252933] dark:text-gray-300 mr-1">粉丝</dt>
              <dd className="text-[#252933] dark:text-gray-200 font-medium">
                {userStats.following}
              </dd>
            </div>
          </dl>
        </nav>
      </header>
    </article>
  );
};

export default UserProfileHeader;
