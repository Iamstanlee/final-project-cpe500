'use client';

import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Transaction } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface Props {
  onClose: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details: Transaction;
}

const TransactionDetail = ({ open, setOpen, details }: Props) => {

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader className="p-0">
          <SheetTitle>Transaction Details</SheetTitle>
        </SheetHeader>
        <div className="grid mt-6 gap-6 py-4 divide-y-2 divide-slate-100">
          <div>
            <Badge variant={details.status}>{details.status}</Badge>
          </div>

          <div className="pt-4">
            <span className="min-w-[120px] inline-block">Transaction ID: </span>
            <span>{details.id}</span>
          </div>

          <div className="pt-4">
            <span className="min-w-[120px] inline-block">From: </span>
            <span>{details.from}</span>
          </div>

          <div className="pt-4">
            <span className="min-w-[120px] inline-block">Type: </span>
            <span className="uppercase">{details.type}</span>
          </div>

          <div className="pt-4">
            <span className="min-w-[120px] inline-block">Amount: </span>
            <span>{formatCurrency(details.amount.value)}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetail;
