import type { Meta, StoryObj } from '@storybook/react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from './index';

import Button from '@/components/common/button';
import { cn } from '@/utils';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '抽屉组件是一个从屏幕边缘滑出的浮层面板，可以从上下左右四个方向展开。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shouldScaleBackground: {
      control: 'boolean',
      description: '是否缩放背景',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

// 基础示例 - 默认从右边滑出
export const Basic: Story = {
  args: {
    shouldScaleBackground: false,
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">打开抽屉</Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle>抽屉标题</DrawerTitle>
          <DrawerDescription>这是一个基础的抽屉示例。</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>抽屉的主要内容区域</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">关闭</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// 不同方向的示例
export const Directions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map((direction) => (
        <Drawer key={direction} shouldScaleBackground={false}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              从{direction}打开
            </Button>
          </DrawerTrigger>
          <DrawerContent
            direction={direction}
            className={cn({
              'max-w-[400px]': direction === 'left' || direction === 'right',
              'max-h-[80vh]': direction === 'top' || direction === 'bottom',
            })}
          >
            <DrawerHeader>
              <DrawerTitle>从{direction}方向打开的抽屉</DrawerTitle>
              <DrawerDescription>当前方向: {direction}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p>这个抽屉从{direction}方向滑出。</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">关闭</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

// 自定义样式示例
export const CustomStyling: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">自定义样式抽屉</Button>
      </DrawerTrigger>
      <DrawerContent direction="right" className="bg-primary text-primary-foreground">
        <DrawerHeader>
          <DrawerTitle className="text-primary-foreground">自定义样式</DrawerTitle>
          <DrawerDescription className="text-primary-foreground/80">
            这是一个使用自定义样式的抽屉示例。
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>使用自定义背景色和文字颜色的抽屉内容。</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">关闭</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// 带表单的示例
export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">表单抽屉</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>编辑信息</DrawerTitle>
          <DrawerDescription>在这里修改你的个人信息。</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              姓名
            </label>
            <input
              id="name"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="请输入姓名"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="请输入邮箱"
            />
          </div>
        </div>
        <DrawerFooter className="flex flex-row justify-end space-x-2">
          <DrawerClose asChild>
            <Button variant="outline">取消</Button>
          </DrawerClose>
          <Button>保存</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
