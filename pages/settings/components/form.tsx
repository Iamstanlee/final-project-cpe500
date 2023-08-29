import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/form";
import { Input } from "@/input";
import { userSchema } from "@/lib/types";

interface Props {
  onClose: () => void;
  payment_link?: string;
}

type IntegrationFormValues = z.infer<typeof userSchema>;
let defaultValues: Partial<IntegrationFormValues> = {};

const AccountUpdateForm = ({ onClose, payment_link }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  defaultValues = {
    email_address: "",
    first_name: "",
    last_name: "",
    payment_link,
  };

  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  async function onSubmit(data: IntegrationFormValues) {
    setLoading(true);
    // submit function goes here
    // setLoading(false);
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
                <FormLabel>
                  First Name <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="first_name"
                  placeholder="John"
                  {...form.register("first_name", {
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
          name="last_name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Last Name <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="last_name"
                  placeholder="Doe"
                  {...form.register("last_name", {
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
          name="email_address"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Email <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="email_address"
                  placeholder="naruto@awesomebusiness.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_link"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Payment Link <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input id="payment_link" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full rounded-md"
          variant={"primary"}
          loading={loading}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default AccountUpdateForm;
