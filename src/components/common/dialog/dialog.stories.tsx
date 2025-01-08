import type { Meta, StoryObj } from '@storybook/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './index';
import Button from '../button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">打开对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>基础对话框</DialogTitle>
          <DialogDescription>这是一个基础的对话框示例，展示了对话框的基本用法。</DialogDescription>
        </DialogHeader>
        <div className="py-4">这里是对话框的主要内容区域。</div>
        <DialogFooter>
          <Button variant="outline">取消</Button>
          <Button>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>表单对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑个人信息</DialogTitle>
          <DialogDescription>在这里修改您的个人信息。完成后点击保存。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              姓名
            </label>
            <input
              id="name"
              className="col-span-3 px-2 py-1 border rounded"
              placeholder="请输入姓名"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              邮箱
            </label>
            <input
              id="email"
              className="col-span-3 px-2 py-1 border rounded"
              placeholder="请输入邮箱"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">取消</Button>
          <Button>保存更改</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const CustomAnimation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>自定义动画</Button>
      </DialogTrigger>
      <DialogContent
        motionProps={{
          initial: { opacity: 0, scale: 0.5, y: -100 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.5, y: 100 },
          transition: { type: 'spring', duration: 0.8, bounce: 0.4 },
        }}
      >
        <DialogHeader>
          <DialogTitle>自定义动画效果</DialogTitle>
          <DialogDescription>这个对话框使用了自定义的动画参数。</DialogDescription>
        </DialogHeader>
        <div className="py-4">观察这个对话框的打开和关闭动画效果。</div>
        <DialogFooter>
          <Button>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
