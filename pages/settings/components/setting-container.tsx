import { cn } from '@/lib/utils';

function SettingContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-center [&>div]:w-full', className)} {...props} />;
}

export default SettingContainer;
