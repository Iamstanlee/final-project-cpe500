import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase';
import { SignupRequestDto } from '@/types';
import { post__request_header } from '@/constants';

const useSignup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const signup = useCallback(async (signupRequestDto: SignupRequestDto) => {
    setIsLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: signupRequestDto.email_address,
      password: signupRequestDto.password,
    });
    const { first_name, last_name } = signupRequestDto;
    if (user) {
      await _createAccount(first_name, last_name, user?.id as string, user?.email as string);
    } else {
      toast.error(error?.message ?? 'An error occurred while creating an account. Please try again.');
    }
    setIsLoading(false);
  }, []);

  const _createAccount = useCallback(
    async (first_name: string, last_name: string, user_id: string, email_address: string) => {
      try {
        const response = await fetch('/api/signup', {
          ...post__request_header,
          body: JSON.stringify({
            user_id,
            email_address,
            first_name,
            last_name,
          }),
        });
        if (response.status == 200) {
          toast.success('Account created successfully');
          router.push('/dashboard').then(() => router.reload());
        }else {
            toast.error('An error occurred while creating an account. Please try again.');
        }
      } catch (error) {
        toast.error(error.message ?? 'An unknown error occurred. Please try again.');
      }
    },
    []
  );

  return { isLoading, signup };
};

export default useSignup;
