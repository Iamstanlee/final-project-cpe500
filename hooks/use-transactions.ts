import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/supabase";
import { Db } from "@/constants";
import { Transaction } from "@/types";
import { generateRandomId } from "@/utils";

// TODO use context and add pagination
const useTransactions = () => {
  const { wallet } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    if (wallet) {
      getTransactions(wallet.id);
    }
  }, [wallet]);

  const getTransactions = useCallback(async (wallet_id: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.from(Db.transactions__table).select().match({ wallet_id });
    if (error) {
      setError(error.message ?? 'An unknown error occurred. Please try again.');
    } else {
      const randomTxns: Transaction[] = [
        {
          id: generateRandomId(),
          wallet_id: '1',
          from: 'Stanley Akpama',
          status: 'success',
          type: 'transfer',
          amount: {
            value: 273343,
            currency: 'NGN',
          },
          created_at: '2023-09-01T00:00:00.000Z',
        },
        {
          id: generateRandomId(),
          wallet_id: '1',
          from: 'Rukkie',
          status: 'success',
          type: 'transfer',
          amount: {
            value: 400000,
            currency: 'NGN',
          },
          created_at: '2023-09-01T00:00:00.000Z',
        },
        {
          id: generateRandomId(),
          wallet_id: '1',
          from: 'Stanley Akpama',
          status: 'success',
          type: 'transfer',
          amount: {
            value: 273343,
            currency: 'NGN',
          },
          created_at: '2023-09-01T00:00:00.000Z',
        },
        {
          id: generateRandomId(),
          wallet_id: '1',
          from: 'Stanlee',
          status: 'success',
          type: 'transfer',
          amount: {
            value: 43022,
            currency: 'NGN',
          },
          created_at: '2023-09-01T00:00:00.000Z',
        },
      ];
      setTransactions([...randomTxns, ...data]);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, transactions };
};

export default useTransactions;
