import { ArrowLeftRight, Copy } from 'lucide-react';
import { Card, CardHeader } from '@/card';
import TransactionList from '@/pages/transactions/components/transaction-list';
import { useAuth } from '@/hooks/use-auth';
import { formatCurrency } from '@/utils';

export default function DashboardPage() {
  const { wallet, paymentLink } = useAuth();
  return (
    <>
      <div className="flex-2 space-y-1">
        <div className="space-y-4">
          <p>
            Balance:
            <span className="font-bold"> {formatCurrency(wallet?.balance ?? 0, wallet?.currency)}</span>
          </p>
          <p className="pb-8 flex flex-row gap-2 items-center">
            Payment link: https://localhost:3000/pay/{paymentLink?.slug}
            <Copy
              size={20}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText('https://localhost:3000/pay/' + paymentLink?.slug);
                } catch (error) {}
              }}
              className="cursor-pointer"
            />
          </p>
          <div className="grid gap-4 grid-cols-8">
            <Card className="col-span-8">
              <CardHeader>
                <p className="flex text-md item-center">
                  <ArrowLeftRight className="pr-2 self-center" size={24} /> Latest Transactions
                </p>
              </CardHeader>
              <TransactionList limit={5} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
