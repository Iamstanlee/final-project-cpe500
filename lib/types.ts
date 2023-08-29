import { z } from "zod";

export const signupInputSchema = z.object({
  first_name: z.string({
    required_error: "Must provide a first name for signup",
  }),
  last_name: z.string({
    required_error: "Must provide a last name for signup",
  }),
  email_address: z
    .string({ required_error: "Must provide an email for signup" })
    .email({
      message: "Invalid email address",
    }),
  password: z.string({ required_error: "Password is required" }).min(5),
});

export type SignupInput = z.infer<typeof signupInputSchema>;

export const loginInputSchema = z.object({
  email_address: z
    .string({ required_error: "Must provide an email for login" })
    .email({
      message: "Invalid email address",
    }),
  password: z.string({ required_error: "Password is required" }).min(5),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const transactionSchema = z.object({
  avatar: z.string(),
  id: z.string(),
  title: z.string(),
  status: z.string(),
  type: z.enum(["checkout", "payment_link"]),
  timestamp: z.string().datetime(),
  from: z.string(),
  amount: z.object({
    amount: z.string(),
    parallel: z.string(),
  }),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const paymentLinkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  settlement_token: z.string(),
  amount: z.number(),
  collected_totalamount: z.number().optional().default(0),
  num_of_transactions: z.number().optional().default(0),
  app_id: z.string(),
});

export type PaymentLink = z.infer<typeof paymentLinkSchema>;

export const paymentLinkInputSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: "Must provide a name/title for your payment link",
  }),
  description: z.string({ required_error: "Description is required" }),
  settlement_token: z.string(),
  amount: z.number({ required_error: "A payable amount has to be provided" }),
  app_id: z.string(),
});

export type PaymentLinkInput = z.infer<typeof paymentLinkInputSchema>;

export const userSchema = z.object({
  email_address: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
