import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from './index';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 64,
    height: 64,
  },
};

export const WaveAnimation: Story = {
  args: {
    width: 200,
    height: 100,
    animationEffect: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    width: 200,
    height: 100,
    animation: false,
  },
};

export const SkeletonGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton variant="text" width={300} />
      <Skeleton variant="rectangular" width={300} height={120} />
      <div className="flex gap-2">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="70%" />
        </div>
      </div>
    </div>
  ),
};
