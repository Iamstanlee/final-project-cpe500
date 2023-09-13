import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase';
import { LoginRequestDto } from '@/types';

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const login = useCallback(async (loginRequestDto: LoginRequestDto) => {
    setIsLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: loginRequestDto.email_address,
      password: loginRequestDto.password,
    });
    if (user) {
      toast.success('Login successful');
      router.push('/dashboard').then(() => router.reload());
    } else {
      toast.error(error?.message ?? 'An error occurred while login you in. Please try again.');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, login };
};

export default useLogin;
