import { cn, formatDate } from '@/lib/utils';
import { Column, ColumnDef } from '@tanstack/react-table';
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, MoveDown, MoveUp } from 'lucide-react';
import { Transaction } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <HeaderItem column={column} title="Transaction ID" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-left">
          <span className="truncate">{row.original.id}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <HeaderItem column={column} title="Type" />,
    cell: ({ row }) => (
      <div className="flex items-left">
        <span className="truncate">{row.original.type.split('_').join(' ').toUpperCase()}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'from',
    header: ({ column }) => <HeaderItem column={column} title="From" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 item-left">
          <span className="truncate">{row.original.from}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => <HeaderItem column={column} title="Date & Time" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-left">
          <span>{formatDate(new Date(row.getValue('timestamp')))}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <HeaderItem column={column} title="Amount" />,
    cell: ({ row }) => {
      return (
        <span className="mr-2 text-muted-foreground">
          {row.original.amount.value} {row.original.amount.currency}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => <HeaderItem column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 item-right">
          <Badge variant={row.getValue('status')}>
            <span className="font-small">{row.getValue('status')}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({}) => <ExternalLink size={16} color="blue" className="cursor-pointer" />,
  },
];

interface HeaderItemProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function HeaderItem<TData, TValue>({ column, title, className }: HeaderItemProps<TData, TValue>) {
  const onSort = useCallback(() => {
    if (column.getIsSorted() === 'desc') {
      column.toggleSorting(false);
    } else {
      column.toggleSorting(true);
    }
  }, [column]);

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent" onClick={onSort}>
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? <MoveDown className="ml-2 h-4 w-4" /> : <MoveUp className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
