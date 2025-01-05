import type { Meta, StoryObj } from '@storybook/react';
import { Mail, ArrowRight, Plus, Trash2, Github } from 'lucide-react';

import Button from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础按钮
export const Basic: Story = {
  args: {
    children: '基础按钮',
  },
};

// 按钮变体
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// 按钮尺寸
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
};

// 带图标的按钮
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Mail />}>Send Email</Button>
      <Button rightIcon={<ArrowRight />}>Next Step</Button>
      <Button leftIcon={<Github />} variant="outline">
        Login with Github
      </Button>
      <Button leftIcon={<Trash2 />} variant="destructive">
        Delete
      </Button>
    </div>
  ),
};

// 加载状态
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading variant="outline">
        Processing
      </Button>
      <Button loading variant="destructive">
        Deleting
      </Button>
    </div>
  ),
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled variant="destructive">
        Disabled
      </Button>
    </div>
  ),
};

// 组合示例
export const Combinations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button size="lg" leftIcon={<Mail />} loading>
        Sending...
      </Button>
      <Button variant="outline" rightIcon={<ArrowRight />} size="lg">
        Continue
      </Button>
      <Button variant="destructive" leftIcon={<Trash2 />} size="sm">
        Remove
      </Button>
    </div>
  ),
};
