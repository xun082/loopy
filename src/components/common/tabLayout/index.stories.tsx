import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2 } from 'lucide-react';

import TabLayout from './index';

import Button from '@/components/common/button';

const meta = {
  title: 'Components/TabLayout',
  component: TabLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Basic: Story = {
  args: {
    navItems: [
      { name: '选项一', path: '/tab1' },
      { name: '选项二', path: '/tab2' },
      { name: '选项三', path: '/tab3' },
    ],
    children: <div className="text-center text-gray-500">内容区域</div>,
  },
};

// 带消息数的导航
export const WithBadges: Story = {
  args: {
    navItems: [
      { name: '选项一', path: '/tab1', count: 2 },
      { name: '选项二', path: '/tab2', count: 99 },
      { name: '选项三', path: '/tab3', count: 100 },
      { name: '选项四', path: '/tab4' },
    ],
    children: <div className="text-center text-gray-500">内容区域</div>,
  },
};

// 带右侧按钮
export const WithRightContent: Story = {
  args: {
    navItems: [
      { name: '选项一', path: '/tab1', count: 2 },
      { name: '选项二', path: '/tab2' },
      { name: '选项三', path: '/tab3' },
    ],
    rightContent: (
      <Button
        variant="outline"
        size="sm"
        onClick={() => console.log('clicked')}
        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
        className="rounded-full border-[#e5e6eb] text-[#86909c] 
          hover:border-[#1e80ff] hover:text-[#1e80ff] hover:bg-[#1e80ff]/5
          dark:border-gray-700 dark:text-gray-400 
          dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:bg-blue-500/5
          transition-all duration-200"
      >
        操作按钮
      </Button>
    ),
    children: <div className="text-center text-gray-500">内容区域</div>,
  },
};

// 通知中心示例
export const NotificationExample: Story = {
  args: {
    navItems: [
      { name: '评论互动', path: '/notification', count: 2 },
      { name: '赞和收藏', path: '/notification/likes', count: 1 },
      { name: '新增关注', path: '/notification/follows' },
      { name: '系统通知', path: '/notification/system', count: 100 },
      { name: '私信', path: '/notification/messages' },
    ],
    rightContent: (
      <Button
        variant="outline"
        size="sm"
        onClick={() => console.log('标记全部已读')}
        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
        className="rounded-full border-[#e5e6eb] text-[#86909c] 
          hover:border-[#1e80ff] hover:text-[#1e80ff] hover:bg-[#1e80ff]/5
          dark:border-gray-700 dark:text-gray-400 
          dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:bg-blue-500/5
          transition-all duration-200"
      >
        全部已读
      </Button>
    ),
    children: <div className="text-center text-gray-500">通知内容区域</div>,
  },
};
