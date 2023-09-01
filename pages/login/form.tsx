"use client";

import React, { useState } from "react";
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
import { LoginInput, loginInputSchema } from "@/types";
import { useAuth } from "@/hooks/use-auth";

const defaultValues: Partial<LoginInput> = {
  email_address: "",
  password: "",
};

const LoginForm = () => {
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
  });

  async function onSubmit(data: LoginInput) {
    setLoading(true);
    signIn(data.email_address, data.password);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-6"
      >
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
                <Input
                  autoComplete="new-password"
                  type="password"
                  placeholder="*****"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary" loading={loading}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
