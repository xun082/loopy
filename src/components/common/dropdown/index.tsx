'use client';

import { useState, useRef, type ReactNode } from 'react';
import React from 'react';

import { useClickOutside } from '@/hooks/clickOutside/clickOutside';
import { cn } from '@/utils';

interface DropdownProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
  closeOnClick?: boolean;
}

export default function Dropdown({
  trigger,
  content,
  className,
  contentClassName,
  closeOnClick = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleContentClick = () => {
    if (closeOnClick) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* 触发器 */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* 下拉内容 */}
      {isOpen && (
        <div
          onClick={handleContentClick}
          className={cn(
            'absolute right-0 top-full mt-2',
            'w-[280px] rounded-xl border',
            'bg-popover/80 backdrop-blur-xl shadow-lg',
            'animate-in fade-in-0 zoom-in-95',
            contentClassName,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }
>(function DropdownButtonInner({ children, isActive, onClick, disabled, className }, ref) {
  const buttonClass = cn(
    'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left bg-transparent w-full rounded',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200',
    isActive &&
      !disabled &&
      'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
    disabled && 'text-neutral-400 cursor-not-allowed dark:text-neutral-600',
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick} ref={ref}>
      {children}
    </button>
  );
});
