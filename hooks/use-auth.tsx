import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Db, PaymentLinkType } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { PaymentLink, User, Wallet } from '@/lib/types';

interface AuthContextData {
  isLoading: boolean;
  error?: string;
  user?: User;
  wallet?: Wallet;
  paymentLink?: PaymentLink;
  signOut: () => void;
}

interface UserBootstrapData extends User {
  wallet: Wallet;
  payment_links: PaymentLink[];
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setAuthError] = useState<string>();
  const [bootstrapData, setBootstrapData] = useState<UserBootstrapData>();

  const user = useMemo(() => bootstrapData, [bootstrapData]);
  const wallet = useMemo(() => bootstrapData?.wallet, [bootstrapData]);
  const paymentLink = useMemo(
    () => bootstrapData?.payment_links?.find((link) => link.type == PaymentLinkType.basic),
    [bootstrapData]
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        getUser(session);
      } else {
        router.push('/login');
      }
    });
  }, []);

  const getUser = async (session: Session) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from(Db.users__table)
      .select('*, wallet:wallets(*),payment_links:payment_links(*)')
      .match({ id: session.user?.id })
      .single();
    if (error) {
      setAuthError(error.message ?? 'An unknown error occurred. Please try again.');
    } else {
      setBootstrapData(data);
    }
    setIsLoading(false);
  };

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/login');
    toast.info('You have been signed out.');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        error,
        user,
        wallet,
        paymentLink,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (Object.keys(context).length == 0) {
    throw new Error('useAuth context must be used within a AuthContextProvider');
  }
  return context;
};
