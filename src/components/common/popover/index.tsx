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
  zIndex = 50,
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
      className="relative inline-block"
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      <div className="popover-trigger">{trigger}</div>
      <div
        className={cn(
          isVisible ? 'block' : 'hidden',
          'fixed',
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
        style={{
          zIndex,
          ...overlayStyle,
          ...getPopoverPosition(popoverRef.current, placement),
        }}
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
          {title && <div className="text-sm font-medium mb-2">{title}</div>}
          <div className="text-sm text-gray-600 dark:text-gray-300">{content}</div>
        </div>
      </div>
    </div>
  );
}

function getPopoverPosition(triggerElement: HTMLDivElement | null, placement: string) {
  if (!triggerElement) return {};

  const rect = triggerElement.getBoundingClientRect();
  const gap = 10;

  switch (placement) {
    case 'top':
      return {
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + gap,
        transform: 'translateX(-50%)',
      };
    case 'bottom':
      return {
        left: rect.left + rect.width / 2,
        top: rect.bottom + gap,
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        right: window.innerWidth - rect.left + gap,
        top: rect.top + rect.height / 2,
        transform: 'translateY(-50%)',
      };
    case 'right':
      return {
        left: rect.right + gap,
        top: rect.top + rect.height / 2,
        transform: 'translateY(-50%)',
      };
    default:
      return {};
  }
}
