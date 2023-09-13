import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/form';
import { Input } from '@/input';
import { loginInputSchema, LoginRequestDto } from '@/types';
import useLogin from '@/hooks/use-login';

const defaultValues: Partial<LoginRequestDto> = {
  email_address: '',
  password: '',
};

const LoginForm = () => {
  const { isLoading, login } = useLogin();

  const form = useForm<LoginRequestDto>({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
  });

  async function onSubmit(data: LoginRequestDto) {
    await login(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <span>
                <FormLabel>Email</FormLabel>
              </span>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <span>
                <FormLabel>Password</FormLabel>
              </span>
              <FormControl>
                <Input autoComplete="new-password" type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary" loading={isLoading}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
