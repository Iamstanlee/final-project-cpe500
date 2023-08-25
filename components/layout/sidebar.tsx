import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeftRight, Cog, Home, LucideProps, Unlink2, Workflow } from 'lucide-react';

import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    route: string[];
    name: string;
    icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
  }[];
}

const navItems = [
  {
    name: 'Dashboard',
    route: ['/', '/dashboard'],
    icon: Home,
  },
  {
    name: 'Transactions',
    route: ['/transactions'],
    icon: ArrowLeftRight,
  },
  {
    name: 'Payment link',
    route: ['/payment-link'],
    icon: Unlink2,
  },
  {
    name: 'Integrations',
    route: ['/integrations'],
    icon: Workflow,
  },
  {
    name: 'Settings',
    route: ['/settings'],
    icon: Cog,
  },
];

export function Sidebar({ className, items = navItems, ...props }: SidebarProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn('hidden md:flex flex-col bg-white p-2 fixed top-[70px] left-0 md:w-[250px] shadow', className)}
      {...props}
    >
      <div className="h-[50px]"></div>
      <ScrollArea>
        {items.map((item) => (
          <Link key={item.route[0]} href={item.route[0]} className="gap-5 mb-3 block">
            <Button
              variant={item.route.includes(pathname ?? '') ? 'primary' : 'ghost'}
              className="w-full rounded-md justify-start py-3"
            >
              <item.icon size={18} color={item.route.includes(pathname ?? '') ? 'white' : 'black'} />
              <p className={cn(item.route.includes(pathname ?? '') && 'text-white', 'text-sm ml-4')}>{item.name}</p>
            </Button>
          </Link>
        ))}
      </ScrollArea>
    </nav>
  );
}
