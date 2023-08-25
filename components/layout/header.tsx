import Link from "next/link";
import { cn } from "@/lib/cn";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "z-10 fixed top-0 right-0 w-full md:w-screen h-[70px] border-b border-slate-100 bg-white py-3 pl-14 md:pl-20 pr-3 md:pr-8 flex flex-row justify-between items-center",
        className
      )}
    >
      <Link href="/dashboard/" className="flex">
        {/* <SvgIcon name="wano" size={70} /> */}
        logo
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {/* <NetworkSwitcher /> */}
        switcher{" "}
      </div>
    </div>
  );
};

export default Header;
