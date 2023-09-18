import { useState } from 'react';
import { LogOut, Megaphone, User } from 'lucide-react';
import { CaretRight } from 'phosphor-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SettingContainer from './components/setting-container';
import Account from '@/pages/settings/sections/account';
import Notification from '@/pages/settings/sections/notification';
import { useAuth } from '@/hooks/use-auth';

enum _page {
  account = 'accounts',
  notification = 'notifications',
}

const nav = [
  {
    title: 'Account',
    key: _page.account,
    icon: User,
  },
  {
    title: 'Notification',
    key: _page.notification,
    icon: Megaphone,
  },
];

const pages = [
  { key: _page.notification, page: <Notification /> },
  { key: _page.account, page: <Account /> },
];

export default function SettingsPage() {
    const { signOut } = useAuth();

  const [page, setPage] = useState<_page>(_page.account);

  const selected = pages.find((value) => value.key == page);

  return (
    <div className="block bg-white rounded-lg h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="p-4 items-center justify-center">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings & preferences.</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-row">
        <aside className="mx-2 w-[250px] border-r border-slate-200">
          <nav className={cn('flex flex-col space-y-2 py-2 pr-2')}>
            <div className="h-[8px]" />
            {nav.map((item) => (
              <div
                key={item.key}
                onClick={() => setPage(item.key)}
                className={cn(
                  buttonVariants({
                    variant: page == item.key ? 'primary' : 'ghost',
                  }),
                  'justify-between rounded-md cursor-pointer'
                )}
              >
                <div className="flex flex-row">
                  <item.icon size={18} />
                  <span className="ml-2">{item.title}</span>
                </div>
                <CaretRight />
              </div>
            ))}
            <Separator />
            <div
              onClick={() => {}}
              className={cn(buttonVariants({ variant: 'ghost' }), 'justify-between rounded-md cursor-pointer')}
            >
              <div className="flex flex-row" onClick={signOut}>
                <LogOut size={18} className="stroke-red-400" />
                <span className="ml-2 text-red-400">Log out</span>
              </div>
            </div>
          </nav>
        </aside>
        <div className="w-full flex flex-col p-3">
          <SettingContainer>{selected?.page}</SettingContainer>
        </div>
      </div>
    </div>
  );
}
