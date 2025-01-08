import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Popover from './index';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 基础示例
export const Basic: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary text-white rounded-md">Hover me</button>,
    title: 'Popover Title',
    content: 'This is the content of the popover. You can place any React node here.',
    placement: 'right',
  },
};

// 带箭头的示例
export const WithArrow: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary text-white rounded-md">Hover me</button>,
    title: 'Popover with Arrow',
    content: 'This popover has an arrow.',
    arrow: true,
    placement: 'bottom',
  },
};

// 自定义样式示例
export const CustomStyle: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary text-white rounded-md">Hover me</button>,
    title: 'Custom Styled Popover',
    content: 'This popover has custom styles.',
    overlayClassName: 'custom-overlay',
    overlayStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    placement: 'top',
  },
};
