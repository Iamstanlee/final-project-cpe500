import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, BellSlash, Target, At } from 'phosphor-react';

export function Notifications() {
  return (
    <div>
      <Card className="border border-slate-300 mb-5">
        <CardHeader className="pb-3">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground justify-between">
            <div className="flex items-start space-x-2">
              <Bell className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Everything</p>
                <p className="text-sm text-slate-500">Failed payment, succussful payments & all activity.</p>
              </div>
            </div>
            <Switch id="everything" />
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all justify-between">
            <div className="flex items-start space-x-2">
              <Target className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Priority</p>
                <p className="text-sm text-slate-500">Only important and priority notifications.</p>
              </div>
            </div>
            <Switch id="priority" />
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground justify-between">
            <div className="flex items-start space-x-2">
              <BellSlash className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Ignoring</p>
                <p className="text-sm text-slate-500">Turn off all notifications.</p>
              </div>
            </div>
            <Switch id="mute" />
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground justify-between">
            <div className="flex items-start space-x-2">
              <At className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Email Notifications</p>
                <p className="text-sm text-slate-500">
                  Get personalised email notifications for products offerings and other related services.
                </p>
              </div>
            </div>
            <Switch id="email_notification" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
