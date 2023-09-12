import { Activity, ArrowLeftRight, DollarSign, Users } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import TransactionList from '@/pages/transactions/components/transaction-list';
import InfoCard from '@/pages/dashboard/components/info-card';

export default function Dashboard() {
  return (
    <>
      <div className="flex-2 space-y-1">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              title="Total revenue"
              value="$34,040.44"
              icon={<DollarSign />}
              additional_info="+20% from last month"
            />
            <InfoCard title="Total sales" value="102" icon={<Activity />} additional_info="+20% from last month" />
            <InfoCard title="Unique customers" value="44" icon={<Users />} additional_info="+4% from last month" />
          </div>
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
