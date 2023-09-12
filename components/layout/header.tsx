import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { signOut } = useAuth();
  return (
    <div
      className={cn(
        'z-10 fixed top-0 right-0 w-full md:w-screen h-[70px] border-b border-slate-100 bg-white py-3 pl-14 md:pl-20 pr-3 md:pr-8 flex flex-row justify-between items-center',
        className
      )}
    >
      <Link href="/dashboard" className="flex">
        500lvl Project
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        <p onClick={signOut}>AVATAR</p>
      </div>
    </div>
  );
};

export default Header;
