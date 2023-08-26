import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Transaction, transactionSchema } from '@/lib/types';

import { DataTable } from './data-table';
import { columns } from './columns';
import { data } from './data';
import { Card } from '@/card';

interface TransactionListProps {
  limit?: number;
  pagination?: boolean;
  filter?: boolean;
}

const TransactionList = ({ limit = 12, pagination = false, filter = false }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(
      z
        .array(transactionSchema)
        .parse(JSON.parse(JSON.stringify(data)))
        .slice(0, limit)
    );
  }, [limit]);

  return (
    <Card className="pt-5">
      <DataTable columns={columns} data={transactions} pagination={pagination} filter={filter} />
    </Card>
  );
};

export default TransactionList;
