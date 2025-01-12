import { ButtonHTMLAttributes, HTMLProps, forwardRef } from 'react';

import Icon from '../icons';
import Tooltip from '../tooltip';
import Button, { ButtonProps } from '../button';

import { cn } from '@/utils';

type ToolbarWrapperProps = HTMLProps<HTMLDivElement> & {
  isVertical?: boolean;
};

function ToolbarWrapper(
  { children, className, isVertical, ...rest }: ToolbarWrapperProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        'flex flex-shrink-0 select-none items-center gap-1 px-2 py-1 sticky top-0 left-0 z-50 overflow-x-auto rounded-t-lg border-b border-b-border backdrop-blur drop-shadow-sm',
        {
          'w-full justify-between': !isVertical,
          'flex-col min-w-[120px] items-stretch': isVertical,
        },
        className,
      )}
    >
      <div
        className={cn(
          'overflow-hidden',
          isVertical ? 'w-full flex flex-col' : 'w-full flex flex-wrap items-center',
        )}
      >
        {children}
      </div>
    </div>
  );
}

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

function ToolbarDivider(
  { horizontal, className, ...rest }: ToolbarDividerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const dividerClassName = cn(
    'bg-zinc-200 dark:bg-slate-700',
    horizontal ? 'w-full min-w-[1.5rem] h-px my-1' : 'h-full min-h-[1.5rem] w-px mx-1',
    className,
  );

  return <div className={dividerClassName} ref={ref} {...rest} />;
}

export type ToolbarGroupProps = {} & HTMLProps<HTMLDivElement>;

function ToolbarGroup({ className, ...rest }: ToolbarGroupProps, ref: React.Ref<HTMLDivElement>) {
  const groupClassName = cn('flex items-center gap-1 mx-1 first:ml-0 last:mr-0', className);

  return <div className={groupClassName} ref={ref} {...rest} />;
}

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeClassname?: string;
  tooltip?: string;
  tooltipShortcut?: string[];
  buttonSize?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  isDropdown?: boolean;
};

function ToolbarButton(
  {
    children,
    buttonSize = 'icon',
    variant = 'ghost',
    className,
    tooltip,
    tooltipShortcut,
    activeClassname = 'bg-blue-500/10 text-blue-700 hover:text-blue-700 hover:bg-blue-500/20',
    active,
    isDropdown,
    ...rest
  }: ToolbarButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const buttonClass = cn(
    'min-w-8 w-auto h-8 bg-transparent rounded aria-expanded:bg-blue-500/10 aria-expanded:text-blue-700 focus-visible:ring-0',
    className,
    {
      [`${activeClassname}`]: active,
      'hover:bg-zinc-100 text-zinc-500 dark:text-slate-400 dark:hover:bg-slate-700': !active,
      'my-1': isDropdown,
    },
  );

  const component = (
    <Button className={buttonClass} variant={variant} size={buttonSize} ref={ref} {...rest}>
      {children}
      {isDropdown && <Icon name="ChevronDown" className="size-4 ml-0.5" />}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} shortcut={tooltipShortcut}>
        {component}
      </Tooltip>
    );
  }

  return component;
}

// 使用 forwardRef 包装具名函数
const WrappedToolbarWrapper = forwardRef(ToolbarWrapper);
const WrappedToolbarDivider = forwardRef(ToolbarDivider);
const WrappedToolbarGroup = forwardRef(ToolbarGroup);
const WrappedToolbarButton = forwardRef(ToolbarButton);

export const Toolbar = {
  Wrapper: WrappedToolbarWrapper,
  Button: WrappedToolbarButton,
  Divider: WrappedToolbarDivider,
  Group: WrappedToolbarGroup,
};
