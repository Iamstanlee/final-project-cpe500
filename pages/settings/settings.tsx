import { Separator } from "@/components/ui/separator";
import { User, Palette, Wallet, Megaphone, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { CaretRight } from "phosphor-react";
import SettingContainer from "./components/setting-container";
import Accounts from "./subs/account.sub";
import { Notifications } from "./subs/notifications.sub";

enum _page {
  account = "accounts",
  notification = "notifications",
  wallet = "wallet",
  appearance = "appearance",
  privacy = "privacy",
  tc = "tc",
}

const nav = [
  {
    title: "Account",
    key: _page.account,
    icon: User,
  },
  {
    title: "Notifications",
    key: _page.notification,
    icon: Megaphone,
  },
];

const pages = [
  { key: "notifications", page: <Notifications /> },
  { key: "accounts", page: <Accounts /> },
];

export function Settings() {
  const [page, setPage] = useState<_page>(_page.account);

  const selected = pages.find((value) => value.key == page);

  return (
    <div className="block bg-white rounded-lg h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="p-4 items-center justify-center">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings & preferences.
          </p>
        </div>
        {/* <Badge className="cursor-pointer h-5 mr-5">
          {truncateWalletAddress(user?.address ?? '', 8)}
          <Copy className="ml-2" size={10} />
        </Badge> */}
      </div>

      <Separator />

      <div className="flex flex-row">
        <aside className="mx-2 w-[250px] border-r border-slate-200">
          <nav className={cn("flex flex-col space-y-2 py-2 pr-2")}>
            <div className="h-[8px]" />
            {nav.map((item) => (
              <div
                key={item.key}
                onClick={() => setPage(item.key)}
                className={cn(
                  buttonVariants({
                    variant: page == item.key ? "primary" : "ghost",
                  }),
                  "justify-between rounded-md cursor-pointer"
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
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-between rounded-md cursor-pointer"
              )}
            >
              <div className="flex flex-row">
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
