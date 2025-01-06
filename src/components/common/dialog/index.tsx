'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

import { cn } from '@/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

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

interface DialogOverlayProps
  extends Omit<DialogPrimitive.DialogOverlayProps, keyof HTMLMotionProps<'div'>> {
  className?: string;
}

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={overlayVariants}>
      <DialogPrimitive.Overlay
        className={cn('fixed inset-0 z-50 bg-black/60 backdrop-blur-sm', className)}
        {...props}
      />
    </motion.div>
  );
}

type DialogContentPrimitiveProps = DialogPrimitive.DialogContentProps;
type MotionDivProps = HTMLMotionProps<'div'>;

interface DialogContentProps {
  className?: string;
  children?: React.ReactNode;
  motionProps?: Omit<MotionDivProps, keyof DialogContentPrimitiveProps>;
}

function DialogContent({ className, children, motionProps }: DialogContentProps) {
  return (
    <DialogPortal>
      <AnimatePresence mode="wait">
        <DialogOverlay />
        <DialogPrimitive.Content asChild>
          <motion.div
            className={cn(
              'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
              'gap-4 border bg-background p-6 shadow-lg sm:rounded-lg',
              'focus:outline-none',
              className,
            )}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            {...motionProps}
          >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </motion.div>
        </DialogPrimitive.Content>
      </AnimatePresence>
    </DialogPortal>
  );
}

interface DialogHeaderProps {
  className?: string;
  children?: React.ReactNode;
  motionProps?: Omit<MotionDivProps, keyof React.HTMLAttributes<HTMLDivElement>>;
}

function DialogHeader({ className, children, motionProps }: DialogHeaderProps) {
  return (
    <motion.div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  );
}

interface DialogTitleProps extends DialogPrimitive.DialogTitleProps {
  className?: string;
}

function DialogTitle({ className, children, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {children}
      </motion.span>
    </DialogPrimitive.Title>
  );
}

interface DialogDescriptionProps extends DialogPrimitive.DialogDescriptionProps {
  className?: string;
}

function DialogDescription({ className, children, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {children}
      </motion.span>
    </DialogPrimitive.Description>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
