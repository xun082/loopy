import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './index';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Basic: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary text-white rounded-md">点击我</button>,
    content: (
      <div className="p-4">
        <h3 className="font-medium">基础下拉菜单</h3>
        <p className="text-sm text-muted-foreground">这是一个简单的下拉菜单示例</p>
      </div>
    ),
  },
};

// 用户菜单示例
export const UserMenu: Story = {
  args: {
    trigger: (
      <img src="https://github.com/shadcn.png" alt="user" className="w-10 h-10 rounded-full" />
    ),
    content: (
      <div className="py-2">
        <div className="px-4 py-3 border-b">
          <p className="font-medium">Moment</p>
          <p className="text-sm text-muted-foreground">矿石: 659k</p>
        </div>
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
            <button key={item} className="px-3 py-2 text-sm rounded-lg text-left hover:bg-accent">
              {item}
            </button>
          ))}
        </div>
      </div>
    ),
  },
};

// 禁用点击关闭
export const DisableCloseOnClick: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary text-white rounded-md">选择选项</button>,
    content: (
      <div className="py-2">
        {['选项1', '选项2', '选项3'].map((item) => (
          <button key={item} className="w-full px-4 py-2 text-left hover:bg-accent">
            {item}
          </button>
        ))}
      </div>
    ),
    closeOnClick: false,
  },
};

// 自定义位置
export const CustomPosition: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary text-white rounded-md">左侧下拉</button>,
    content: (
      <div className="p-4">
        <p>自定义位置的下拉菜单</p>
      </div>
    ),
    contentClassName: 'left-0',
  },
};
