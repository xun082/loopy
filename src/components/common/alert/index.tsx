'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

import { buttonVariants } from '../button';

import { cn } from '@/utils';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

interface AlertDialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  className?: string;
}

function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={overlayVariants}>
      <AlertDialogPrimitive.Overlay
        className={cn('fixed inset-0 z-50 bg-black/80', className)}
        {...props}
      />
    </motion.div>
  );
}

interface AlertDialogContentProps {
  className?: string;
  children?: React.ReactNode;
  motionProps?: Omit<HTMLMotionProps<'div'>, keyof AlertDialogPrimitive.AlertDialogContentProps>;
}

function AlertDialogContent({ className, children, motionProps }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AnimatePresence mode="wait">
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content asChild>
          <motion.div
            className={cn(
              'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg',
              className,
            )}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            {...motionProps}
          >
            {children}
          </motion.div>
        </AlertDialogPrimitive.Content>
      </AnimatePresence>
    </AlertDialogPortal>
  );
}

interface AlertDialogHeaderProps {
  className?: string;
  children?: React.ReactNode;
  motionProps?: Omit<HTMLMotionProps<'div'>, keyof React.HTMLAttributes<HTMLDivElement>>;
}

function AlertDialogHeader({ className, children, motionProps }: AlertDialogHeaderProps) {
  return (
    <motion.div
      className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface AlertDialogFooterProps {
  className?: string;
  children?: React.ReactNode;
  motionProps?: Omit<HTMLMotionProps<'div'>, keyof React.HTMLAttributes<HTMLDivElement>>;
}

function AlertDialogFooter({ className, children, motionProps }: AlertDialogFooterProps) {
  return (
    <motion.div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  className?: string;
}

function AlertDialogTitle({ className, children, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...props}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {children}
      </motion.span>
    </AlertDialogPrimitive.Title>
  );
}

interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
  className?: string;
}

function AlertDialogDescription({ className, children, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {children}
      </motion.span>
    </AlertDialogPrimitive.Description>
  );
}

interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  className?: string;
}

function AlertDialogAction({ className, ...props }: AlertDialogActionProps) {
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />;
}

interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  className?: string;
}

function AlertDialogCancel({ className, ...props }: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
