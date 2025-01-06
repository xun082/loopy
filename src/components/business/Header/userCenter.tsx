import Image from 'next/image';
import Link from 'next/link';

import Dropdown from '@/components/common/dropdown';

export default function UserCenter() {
  // 触发器内容
  const trigger = (
    <Image
      src="/user.png"
      alt="user"
      width={40}
      height={40}
      className="rounded-full border border-border/50"
    />
  );

  // 下拉菜单内容
  const content = (
    <>
      {/* 用户信息 */}
      <div className="p-4">
        <Link
          href="/user/1"
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image src="/user.png" alt="user" width={48} height={48} className="rounded-full" />
          <div>
            <h3 className="font-medium">Moment</h3>
            <div className="text-sm text-muted-foreground">矿石: 659k</div>
          </div>
        </Link>

        {/* 等级进度 */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>掘友等级 JY.7</span>
            <span>9981.6 / 25000</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: '40%' }} />
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <div className="font-medium">30</div>
            <div className="text-sm text-muted-foreground">关注</div>
          </div>
          <div>
            <div className="font-medium">383</div>
            <div className="text-sm text-muted-foreground">赞过</div>
          </div>
          <div>
            <div className="font-medium">36</div>
            <div className="text-sm text-muted-foreground">收藏</div>
          </div>
        </div>
      </div>

      {/* 菜单项 */}
      <div className="border-t border-border/50">
        <div className="grid grid-cols-2 gap-1 p-2">
          {[
            '我的主页',
            '成长福利',
            '闪念笔记',
            '会员中心',
            '课程中心',
            '我的优惠',
            '我的报名',
            '我的足迹',
          ].map((item) => (
            <button
              key={item}
              className="px-3 py-2 text-sm rounded-lg text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="border-t border-border/50 p-2 flex items-center justify-between">
        <button className="px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
          我的设置
        </button>
        <button className="px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
          退出登录
        </button>
      </div>
    </>
  );

  return <Dropdown trigger={trigger} content={content} />;
}
