'use client';

import { useState, useRef, type ReactNode } from 'react';

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
