'use client';

import { useRef, useState } from 'react';

import { cn } from '@/utils';

interface PopoverProps {
  trigger: React.ReactNode;
  title?: React.ReactNode | string;
  content: React.ReactNode | string;
  className?: string;
  arrow?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  zIndex?: number;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayInnerStyle?: React.CSSProperties;
  overlayInnerClassName?: string;
}

export default function Popover({
  trigger,
  title,
  content,
  className,
  arrow = true,
  placement = 'right',
  zIndex = 10,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  overlayInnerClassName,
}: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const showPopover = () => setIsVisible(true);
  const hidePopover = () => setIsVisible(false);

  return (
    <div
      ref={popoverRef}
      className="relative block w-full"
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {/* 触发器 */}
      <div className="popover-trigger">{trigger}</div>
      <div
        className={cn(
          isVisible ? 'block' : 'hidden',
          'absolute',
          'bg-popover/80 backdrop-blur-xl shadow-lg rounded-lg',
          'animate-in fade-in-0 zoom-in-95',
          'whitespace-normal',
          'w-auto',
          placement === 'right' && 'left-[calc(100%+10px)] top-1/2 transform -translate-y-1/2',
          placement === 'left' && 'right-[calc(100%+10px)] top-1/2 transform -translate-y-1/2',
          placement === 'bottom' && 'top-[calc(100%+10px)] left-1/2 transform -translate-x-1/2',
          placement === 'top' && 'bottom-[calc(100%+10px)] left-1/2 transform -translate-x-1/2',
          className,
          overlayClassName,
        )}
        style={{ zIndex, ...overlayStyle }}
      >
        {arrow && (
          <div
            className={cn(
              'w-3 h-3 bg-inherit absolute',
              'transform rotate-45',
              placement === 'bottom' ? '-top-1.5 left-1/2 transform -translate-x-1/2' : undefined,
              placement === 'top' ? '-bottom-1.5 left-1/2 transform -translate-x-1/2' : undefined,
              placement === 'right' ? '-left-1.5 top-1/2 transform -translate-y-1/2' : undefined,
              placement === 'left' ? '-right-1.5 top-1/2 transform -translate-y-1/2' : undefined,
            )}
          />
        )}
        <div className={cn('p-4', overlayInnerClassName)} style={overlayInnerStyle}>
          <div
            className={cn(
              'bg-transparent absolute ',
              placement === 'right' && 'left-[-20px] top-0 w-5 h-full',
              placement === 'left' && 'right-[-20px] top-0 w-5 h-full',
              placement === 'bottom' && 'top-[-20px] left-0 w-full h-5',
              placement === 'top' && 'bottom-[-20px] left-0 w-full h-5',
            )}
          ></div>
          {title && <div className="text-sm font-medium mb-2">{title}</div>}
          <div className="text-sm text-gray-600 dark:text-gray-300">{content}</div>
        </div>
      </div>
    </div>
  );
}
