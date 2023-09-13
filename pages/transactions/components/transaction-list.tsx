import { DataTable } from './data-table';
import { columns } from './columns';
import { Card } from '@/card';
import useTransactions from '@/hooks/use-transactions';

interface TransactionListProps {
  limit?: number;
  pagination?: boolean;
  filter?: boolean;
}

const TransactionList = ({ limit = 12, pagination = false, filter = false }: TransactionListProps) => {
  const { isLoading, transactions } = useTransactions();

  return (
    <Card className="pt-5">
      <DataTable
        columns={columns}
        loading={isLoading}
        data={transactions?.slice(0, limit) ?? []}
        pagination={pagination}
        filter={filter}
      />
    </Card>
  );
};

export default TransactionList;
