import {useCallback, useEffect, useState} from 'react';
import {useAuth} from '@/hooks/use-auth';
import {supabase} from '@/supabase';
import {Db} from '@/constants';
import {Transaction} from '@/types';

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
      setTransactions(data);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, transactions };
};

export default useTransactions;
