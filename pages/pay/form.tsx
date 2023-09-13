import React, { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/form';
import { Input } from '@/input';
import { cardInformationInputSchema, userSchema } from '@/lib/types';

type CardInformationFormValues = z.infer<typeof cardInformationInputSchema>;
let defaultValues: Partial<CardInformationFormValues> = {};

const CardInformationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<CardInformationFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  async function onSubmit(data: CardInformationFormValues) {
    console.log(data);
    setLoading(true);
    // submit function goes here
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Amount <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="amount"
                  placeholder="$20.00"
                  {...form.register('amount', {
                    required: true,
                    minLength: 1,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Email <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input id="email" placeholder="naruto@awesomebusiness.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Card Name <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...form.register('name', {
                    required: true,
                    minLength: 1,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="line1"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Line1 <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="line1"
                  placeholder=""
                  {...form.register('line1', {
                    required: true,
                    minLength: 1,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  District <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="district"
                  placeholder=""
                  {...form.register('district', {
                    required: true,
                    minLength: 1,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Country <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="country"
                  placeholder="NIgeria"
                  {...form.register('country', {
                    required: true,
                    minLength: 1,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-y-4 item-center">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <span>
                  <FormLabel>
                    City <span className="text-red-300">*</span>
                  </FormLabel>
                </span>
                <FormControl>
                  <Input
                    id="city"
                    placeholder="Ikeja"
                    {...form.register('city', {
                      required: true,
                      minLength: 1,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <span>
                  <FormLabel>
                    Postal Code <span className="text-red-300">*</span>
                  </FormLabel>
                </span>
                <FormControl>
                  <Input
                    id="postalCode"
                    placeholder="100213"
                    {...form.register('postalCode', {
                      required: true,
                      minLength: 1,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-y-4 item-center">
          <FormField
            control={form.control}
            name="expMonth"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <span>
                  <FormLabel>
                    Expiry Month <span className="text-red-300">*</span>
                  </FormLabel>
                </span>
                <FormControl>
                  <Input
                    id="expMonth"
                    placeholder=""
                    {...form.register('expMonth', {
                      required: true,
                      minLength: 1,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expYear"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <span>
                  <FormLabel>
                    Expiry Year <span className="text-red-300">*</span>
                  </FormLabel>
                </span>
                <FormControl>
                  <Input
                    id="expYear"
                    placeholder=""
                    {...form.register('expYear', {
                      required: true,
                      minLength: 1,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-y-4 item-center">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <span>
                  <FormLabel>
                    Card Number <span className="text-red-300">*</span>
                  </FormLabel>
                </span>
                <FormControl>
                  <Input
                    id="number"
                    placeholder=""
                    {...form.register('number', {
                      required: true,
                      minLength: 1,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <span>
                  <FormLabel>
                    CVV <span className="text-red-300">*</span>
                  </FormLabel>
                </span>
                <FormControl>
                  <Input
                    id="cvv"
                    placeholder=""
                    {...form.register('cvv', {
                      required: true,
                      minLength: 1,
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Phone Number <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="phoneNumber"
                  placeholder=""
                  {...form.register('phoneNumber', {
                    required: true,
                    minLength: 1,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full rounded-md" variant={'primary'} loading={loading}>
          Pay
        </Button>
      </form>
    </Form>
  );
};

export default CardInformationForm;
