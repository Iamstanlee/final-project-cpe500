import React, { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/form';
import { Input } from '@/input';
import { userSchema } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

interface Props {
  onClose: () => void;
}

type AccountFormValues = z.infer<typeof userSchema>;
let defaultValues: Partial<AccountFormValues> = {};

const AccountUpdateForm = ({ onClose }: Props) => {
  const [loading, setLoading] = useState<boolean>();
  const { user } = useAuth();

  defaultValues = {
    email_address: user?.email_address,
    first_name: user?.first_name,
    last_name: user?.last_name,
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  async function onSubmit(data: AccountFormValues) {
    setLoading(true);
    // submit function goes here
    setLoading(false);
    console.log(data);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>First Name</FormLabel>
              </span>
              <FormControl>
                <Input id="first_name" placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>Last Name</FormLabel>
              </span>
              <FormControl>
                <Input id="last_name" placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>Email</FormLabel>
              </span>
              <FormControl>
                <Input id="email_address" placeholder="naruto@konoha.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full rounded-md" variant={'primary'} loading={loading}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default AccountUpdateForm;
