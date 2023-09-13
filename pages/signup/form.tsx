import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/form';
import { Input } from '@/input';
import { signupInputSchema, SignupRequestDto } from '@/types';
import useSignup from '@/hooks/use-signup';

const defaultValues: Partial<SignupRequestDto> = {};

const SignupForm = () => {
  const { isLoading, signup } = useSignup();

  const form = useForm<SignupRequestDto>({
    resolver: zodResolver(signupInputSchema),
    defaultValues,
  });

  async function onSubmit(data: SignupRequestDto) {
    await signup(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <span>
                <FormLabel>First Name</FormLabel>
              </span>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <span>
                <FormLabel>Last Name</FormLabel>
              </span>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          Signup
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
