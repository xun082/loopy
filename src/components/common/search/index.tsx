'use client';

import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

import { Dialog, DialogContent } from '../dialog';

import { useDebounce } from '@/hooks/debounce';
import { cn } from '@/utils';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-900',
        className,
      )}
      {...props}
    />
  );
});

interface SearchSuggestion {
  id: string;
  title: string;
  type?: string;
  url?: string;
  icon?: React.ReactNode;
}

interface CommandDialogProps extends DialogProps {
  children: React.ReactNode;
  onQueryChange?: (query: string) => Promise<SearchSuggestion[]>;
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
}

function CommandDialog({
  children,
  onQueryChange,
  onSelectSuggestion,
  ...props
}: CommandDialogProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetch = useDebounce(
    async (searchQuery: string) => {
      if (!searchQuery.trim() || !onQueryChange) {
        setSuggestions([]);

        return;
      }

      setIsLoading(true);

      try {
        const results = await onQueryChange(searchQuery);
        setSuggestions(results);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    {
      delay: 300,
      immediate: false,
    },
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      debouncedFetch(value);
    },
    [debouncedFetch],
  );

  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 dark:text-gray-400">
            <CommandInput value={query} onValueChange={handleQueryChange} placeholder="搜索..." />
            <CommandList>
              <CommandEmpty>{isLoading ? '搜索中...' : '没有找到相关结果'}</CommandEmpty>

              {suggestions.length > 0 && (
                <CommandGroup heading="搜索建议">
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.id}
                      value={suggestion.title}
                      onSelect={() => onSelectSuggestion?.(suggestion)}
                    >
                      {suggestion.icon}
                      <span>{suggestion.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {children}
            </CommandList>
          </Command>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(function CommandInput({ className, ...props }, ref) {
  return (
    <div
      className="flex items-center border-b border-gray-200 dark:border-gray-800 px-3"
      cmdk-input-wrapper=""
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <SearchIcon className="mr-2 h-4 w-4 shrink-0" />
      </motion.div>
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
          'focus:ring-0 focus:outline-none',
          'transition-all duration-200',
          className,
        )}
        {...props}
      />
    </div>
  );
});

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(function CommandList({ className, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  );
});

function CommandEmpty({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn('py-6 text-center text-sm text-gray-500', className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  heading,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  heading?: string;
}) {
  return (
    <CommandPrimitive.Group
      heading={heading}
      className={cn(
        'overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 dark:text-gray-400',
        'transition-all duration-200 ease-in-out',
        className,
      )}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors duration-200',
        'hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
        'aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex w-full items-center"
      >
        {children}
      </motion.div>
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('ml-auto text-xs tracking-widest text-gray-500', className)} {...props} />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  type CommandDialogProps,
};
