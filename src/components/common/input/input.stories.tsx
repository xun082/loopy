import type { Meta, StoryObj } from '@storybook/react';

import Input from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础输入框
export const Basic: Story = {
  args: {
    placeholder: '请输入内容...',
  },
};

// 错误状态
export const Error: Story = {
  args: {
    error: true,
    placeholder: '错误状态',
    defaultValue: '输入错误',
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '禁用状态',
  },
};

// 自定义宽度
export const CustomWidth: Story = {
  args: {
    fullWidth: false,
    placeholder: '自定义宽度',
    className: 'w-64',
  },
};

// 密码输入
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '请输入密码',
  },
};

// 带前缀的输入框
export const WithPrefix: Story = {
  render: (args) => (
    <div className="flex items-center w-full max-w-sm space-x-2">
      <span className="text-sm text-muted-foreground">https://</span>
      <Input {...args} />
    </div>
  ),
  args: {
    placeholder: 'your-website.com',
  },
};

// 带后缀的输入框
export const WithSuffix: Story = {
  render: (args) => (
    <div className="flex items-center w-full max-w-sm space-x-2">
      <Input {...args} />
      <span className="text-sm text-muted-foreground">.com</span>
    </div>
  ),
  args: {
    placeholder: 'your-website',
  },
};

// 搜索输入框
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: '搜索...',
    className: 'max-w-sm',
  },
};
