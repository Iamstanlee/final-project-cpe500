import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-slate-200 px-2.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-800',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-slate-900 text-slate-50',
        success: 'border-transparent bg-green-100',
        outline: 'text-slate-950 text-slate-50',
        pending: 'border-transparent bg-orange-100',
        failed: 'border-transparent bg-red-100',
        info: 'border-transparent bg-grey-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
