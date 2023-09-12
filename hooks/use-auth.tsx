import { post__request_header } from '@/lib/constants';
import { supabase, SupabaseUser } from '@/lib/supabase';
import { PaymentLink, User, Wallet } from '@/lib/types';
import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export enum AuthState {
  SIGN_UP_REQUIRED,
  SIGN_IN_REQUIRED,
  LOADING,
  SIGN_IN_SUCCESS,
}

interface AuthContextData {
  authState: AuthState;
  user?: User;
  wallet?: Wallet;
  paymentLink?: PaymentLink;
  signOut: () => void;
  signIn: Function;
  signUp: Function;
  getPaymentLink: Function;
}

interface UserBootstrapData extends User {
  wallet: Wallet;
  payment_link: PaymentLink;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>(AuthState.LOADING);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | undefined>();
  const [bootstrapData, setBootstrapData] = useState<UserBootstrapData>();

  const user = useMemo(() => bootstrapData, [bootstrapData]);
  const wallet = useMemo(() => bootstrapData?.wallet, [bootstrapData]);
  const paymentLink = useMemo(() => bootstrapData?.payment_link, [bootstrapData]);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (supabaseUser) {
      getUser();
    }
  }, [supabaseUser]);

  useEffect(() => {
    if ([AuthState.SIGN_IN_REQUIRED].includes(authState)) router.push('/login');
  }, [authState]);

  const authSuccess = (toastMessage: string) => {
    toast.success(toastMessage);
    setAuthState(AuthState.SIGN_IN_SUCCESS);
    router.push('/');
  };

  const authError = (toastMessage: string) => {
    setAuthState(AuthState.SIGN_IN_REQUIRED);
    console.log(toastMessage);
    toast.error(toastMessage);
  };

  const checkSession = useCallback(async () => {
    setAuthState(AuthState.LOADING);
    const { data } = await supabase.auth.getSession();
    if (data && data.session) {
      setSupabaseUser(data?.session?.user);
      setAuthState(AuthState.SIGN_IN_SUCCESS);
    } else {
      setAuthState(AuthState.SIGN_IN_REQUIRED);
    }
  }, []);

  const getPaymentLink = async (slug: string) => {
    try {
      const response = await fetch('/api/get-payment-link/', {
        ...post__request_header,
        body: JSON.stringify({ slug }),
      });
      const data = await response.json();

      if (response.status == 500) {
        console.log(data.message);
        toast.error(data.message);
        return { error: data.message };
      }
      if (response.status == 200) {
        console.log(data);

        return { data: data?.user as PaymentLink };
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      return error.message;
    }
  };

  const getUser = async () => {
    setAuthState(AuthState.LOADING);

    try {
      const response = await fetch('/api/fetch-user/', {
        ...post__request_header,
        body: JSON.stringify({
          user_id: supabaseUser?.id,
        }),
      });
      const data = await response.json();

      if (response.status == 500) {
        authError(data.message);
      }
      if (response.status == 200) {
        const bootstrap = data as UserBootstrapData;
        setBootstrapData(bootstrap);
        setAuthState(AuthState.SIGN_IN_SUCCESS);
      }
    } catch (error) {
      authError(error.message);
    }
  };

  const signIn = useCallback(async (email_address: string, password: string) => {
    const { data } = await supabase.auth.signInWithPassword({
      email: email_address,
      password: password,
    });
    if (data) {
      authSuccess("You're signed in");
    } else {
      toast.error('An error occurred while loggin you in. Please try again.');
    }
  }, []);

  const createAccount = useCallback(
    async (first_name: string, last_name: string, user_id: string, email_address: string) => {
      try {
        const response = await fetch('/api/create-account/', {
          ...post__request_header,
          body: JSON.stringify({
            user_id,
            email_address,
            first_name,
            last_name,
          }),
        });
        if (response.status == 200) {
          const data = await response.json();
          authSuccess(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    []
  );

  const signUp = useCallback(async (email_address: string, first_name: string, last_name: string, password: string) => {
    const { data } = await supabase.auth.signUp({
      email: email_address,
      password: password,
    });
    if (data?.user) {
      await createAccount(first_name, last_name, data?.user?.id as string, data?.user?.email as string);
    } else {
      toast.error('An error occurred while creating account. Please try again.');
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Something went wrong');
    } else {
      setAuthState(AuthState.SIGN_IN_REQUIRED);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        user,
        wallet,
        paymentLink,
        signIn,
        signUp,
        signOut,
        getPaymentLink,
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
