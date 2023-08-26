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
}

type IntegrationFormValues = z.infer<typeof userSchema>;
let defaultValues: Partial<IntegrationFormValues> = {};

const AccountUpdateForm = ({ onClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  defaultValues = {
    address: "",
    email_address: "",
    app_id: "",
    active_chain_id: "",
    business_name: "",
    twitter_handle: "",
    website_url: "",
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
          name="business_name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Account Name <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="business_name"
                  placeholder="Awesome business"
                  {...form.register("business_name", {
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
          name="twitter_handle"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Twitter Handle <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input id="twitter_handle" placeholder="@handle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website_url"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <span>
                <FormLabel>
                  Website URL <span className="text-red-300">*</span>
                </FormLabel>
              </span>
              <FormControl>
                <Input
                  id="website_url"
                  placeholder="https://wano.finance"
                  {...field}
                />
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
