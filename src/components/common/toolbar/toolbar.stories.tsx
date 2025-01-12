import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '@radix-ui/react-tooltip';

import { Toolbar } from './index';
import Icon from '../icons';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar.Wrapper,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'A flexible and customizable toolbar component',
    docs: {
      description: {
        component: `
          Toolbar is a collection of components for building toolbar interfaces. 
          It provides a set of composable sub-components including buttons, dividers, and groups.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the toolbar wrapper',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Toolbar content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Toolbar.Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// 创建一个通用的示例组件来减少重复代码
const ExampleIcons = () => (
  <>
    <Toolbar.Button tooltip="Bold" tooltipShortcut={['⌘', 'B']}>
      <Icon name="Bold" className="size-4" />
    </Toolbar.Button>
    <Toolbar.Button tooltip="Italic" tooltipShortcut={['⌘', 'I']}>
      <Icon name="Italic" className="size-4" />
    </Toolbar.Button>
    <Toolbar.Button tooltip="Underline" tooltipShortcut={['⌘', 'U']}>
      <Icon name="Underline" className="size-4" />
    </Toolbar.Button>
  </>
);

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <div className="w-[600px]">
        <Toolbar.Wrapper>
          <Toolbar.Group>
            <ExampleIcons />
          </Toolbar.Group>
        </Toolbar.Wrapper>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic toolbar layout with grouped formatting buttons.',
      },
    },
  },
};

export const WithGroups: Story = {
  render: () => (
    <TooltipProvider>
      <div className="w-[600px]">
        <Toolbar.Wrapper>
          <Toolbar.Group>
            <ExampleIcons />
          </Toolbar.Group>
          <Toolbar.Divider />
          <Toolbar.Group>
            <Toolbar.Button tooltip="Align Left">
              <Icon name="AlignLeft" className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button tooltip="Align Center" active>
              <Icon name="AlignCenter" className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button tooltip="Align Right">
              <Icon name="AlignRight" className="size-4" />
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Wrapper>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with multiple groups separated by dividers.',
      },
    },
  },
};

export const WithDropdowns: Story = {
  render: () => (
    <TooltipProvider>
      <div className="w-[600px]">
        <Toolbar.Wrapper>
          <Toolbar.Group>
            <Toolbar.Button isDropdown tooltip="Paragraph">
              Paragraph
            </Toolbar.Button>
            <Toolbar.Button isDropdown tooltip="Font Family">
              Arial
            </Toolbar.Button>
          </Toolbar.Group>
          <Toolbar.Divider />
          <Toolbar.Group>
            <ExampleIcons />
          </Toolbar.Group>
        </Toolbar.Wrapper>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with dropdown buttons for text formatting options.',
      },
    },
  },
};

export const CustomActiveStyles: Story = {
  render: () => (
    <TooltipProvider>
      <div className="w-[600px]">
        <Toolbar.Wrapper>
          <Toolbar.Group>
            <Toolbar.Button tooltip="Default Active" active>
              <Icon name="Bold" className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              tooltip="Custom Green"
              active
              activeClassname="bg-green-500/10 text-green-700 hover:text-green-700 hover:bg-green-500/20"
            >
              <Icon name="Check" className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              tooltip="Custom Purple"
              active
              activeClassname="bg-purple-500/10 text-purple-700 hover:text-purple-700 hover:bg-purple-500/20"
            >
              <Icon name="Star" className="size-4" />
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Wrapper>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of different active state styles for toolbar buttons.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <TooltipProvider>
      <div className="w-full max-w-[600px]">
        <Toolbar.Wrapper>
          <Toolbar.Group>
            <Toolbar.Button isDropdown tooltip="Paragraph">
              Paragraph
            </Toolbar.Button>
          </Toolbar.Group>
          <Toolbar.Divider />
          <Toolbar.Group>
            <ExampleIcons />
          </Toolbar.Group>
          <Toolbar.Divider />
          <Toolbar.Group>
            <Toolbar.Button tooltip="Align Left">
              <Icon name="AlignLeft" className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button tooltip="Align Center">
              <Icon name="AlignCenter" className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button tooltip="Align Right">
              <Icon name="AlignRight" className="size-4" />
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Wrapper>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive toolbar that adapts to different screen sizes.',
      },
    },
  },
};
