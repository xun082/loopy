'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { motion, type MotionProps } from 'framer-motion';

import { cn } from '@/utils';

export type DrawerDirection = 'top' | 'right' | 'bottom' | 'left';

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

function Drawer({ shouldScaleBackground = false, ...props }: DrawerProps) {
  return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />;
}

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;
const DrawerPortal = DrawerPrimitive.Portal;

interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> {
  className?: string;
}

function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  );
}

interface DrawerContentProps extends Omit<MotionProps, 'children'> {
  className?: string;
  children: React.ReactNode;
  direction?: DrawerDirection;
}

function DrawerContent({ className, children, direction = 'right', ...props }: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content asChild>
        <motion.div
          className={cn(
            'fixed z-50 bg-background p-6 shadow-lg',
            {
              'inset-x-0 top-0 border-b max-h-[80vh]': direction === 'top',
              'right-0 inset-y-0 h-full w-3/4 max-w-[500px] border-l': direction === 'right',
              'inset-x-0 bottom-0 border-t max-h-[80vh]': direction === 'bottom',
              'left-0 inset-y-0 h-full w-3/4 max-w-[500px] border-r': direction === 'left',
            },
            className,
          )}
          initial={
            direction === 'right'
              ? { x: '100%' }
              : direction === 'left'
                ? { x: '-100%' }
                : direction === 'top'
                  ? { y: '-100%' }
                  : { y: '100%' }
          }
          animate={direction === 'right' || direction === 'left' ? { x: 0 } : { y: 0 }}
          exit={
            direction === 'right'
              ? { x: '100%' }
              : direction === 'left'
                ? { x: '-100%' }
                : direction === 'top'
                  ? { y: '-100%' }
                  : { y: '100%' }
          }
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
            mass: 0.8,
          }}
          {...props}
        >
          <div
            className={cn('absolute', {
              'left-1/2 -translate-x-1/2 top-2': direction === 'bottom',
              'left-1/2 -translate-x-1/2 bottom-2': direction === 'top',
              'top-1/2 -translate-y-1/2 right-2': direction === 'left',
              'top-1/2 -translate-y-1/2 left-2': direction === 'right',
            })}
          >
            <div className="h-1.5 w-12 rounded-full bg-muted" />
          </div>
          {children}
        </motion.div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />;
}

function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
