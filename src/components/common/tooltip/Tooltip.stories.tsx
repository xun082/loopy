import type { Meta, StoryObj } from '@storybook/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import Tooltip from './index';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component that displays additional information on hover, with optional keyboard shortcuts.',
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipPrimitive.Provider>
        <Story />
      </TooltipPrimitive.Provider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main text content of the tooltip',
    },
    children: {
      control: 'text',
      description: 'The trigger element that the tooltip wraps',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the tooltip is enabled',
      defaultValue: true,
    },
    shortcut: {
      control: 'object',
      description: 'Array of keyboard shortcut keys (e.g., ["Mod", "K"])',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: <button className="px-4 py-2 bg-gray-100 rounded">Hover me</button>,
    title: 'This is a tooltip',
  },
};

export const WithShortcut: Story = {
  args: {
    children: <button className="px-4 py-2 bg-gray-100 rounded">Command Menu</button>,
    title: 'Open Command Menu',
    shortcut: ['Mod', 'K'],
  },
};

export const Disabled: Story = {
  args: {
    children: <button className="px-4 py-2 bg-gray-100 rounded">Tooltip Disabled</button>,
    title: 'You will not see this',
    enabled: false,
  },
};

export const ComplexContent: Story = {
  args: {
    children: <button className="px-4 py-2 bg-gray-100 rounded">With Icon</button>,
    title: (
      <div className="flex items-center gap-2">
        <span>⚡</span>
        <span>Quick Action</span>
      </div>
    ),
    shortcut: ['Shift', 'Alt', 'T'],
  },
};

export const LongContent: Story = {
  args: {
    children: <button className="px-4 py-2 bg-gray-100 rounded">Long Tooltip</button>,
    title: 'This is a longer tooltip that might wrap to multiple lines',
    shortcut: ['Mod', 'Shift', 'P'],
  },
};
