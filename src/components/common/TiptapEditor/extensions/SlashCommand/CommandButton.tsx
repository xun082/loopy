import { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/utils';

export type CommandButtonProps = {
  active?: boolean;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  title: string;
};

function CommandButtonComponent(
  { active, description, icon: Icon, onClick, title }: CommandButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const wrapperClass = cn(
    'flex text-neutral-500 items-center text-xs font-semibold justify-start p-1.5 gap-2 rounded',
    !active && 'bg-transparent hover:bg-neutral-50 hover:text-black',
    active && 'bg-neutral-100 text-black hover:bg-neutral-100',
  );

  return (
    <button ref={ref} onClick={onClick} className={wrapperClass}>
      <Icon className="w-3 h-3" />
      <div className="flex flex-col items-start justify-start">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-neutral-400">{description}</div>
      </div>
    </button>
  );
}

export const CommandButton = forwardRef<HTMLButtonElement, CommandButtonProps>(
  CommandButtonComponent,
);

CommandButton.displayName = 'CommandButton';
