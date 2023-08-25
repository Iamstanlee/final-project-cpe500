import { Metadata } from 'next';
import Dashboard from './dashboard';

export const metadata: Metadata = {
  title: 'Wano | Dashboard',
  description: 'Web3 payment infrastructure for the internet. Pay for anything, anywhere, with crypto.',
};
export default function DashboardPage() {
  return (
    <div className="">
      <Dashboard />
    </div>
  );
}
