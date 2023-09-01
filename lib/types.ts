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
  user_id: z.string(),
  slug: z.string(),
  amount: z.number(),
  type: z.string(),
  collected_totalamount: z.number().optional().default(0),
  num_of_transactions: z.number().optional().default(0),
  metadata: z.object({
    user_id: z.string(),
    user_name: z.string(),
    user_email: z.string(),
  }),
});

export type PaymentLink = z.infer<typeof paymentLinkSchema>;

export const walletSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  balance: z.number(),
  unresolved: z.number(),
  currency: z.string(),
  public_address: z.string().optional(),
});

export type Wallet = z.infer<typeof walletSchema>;

export const userSchema = z.object({
  email_address: z.string().email(),
  wallet_id: walletSchema,
  wallet: walletSchema,
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  payment_link: paymentLinkSchema,
});

export type User = z.infer<typeof userSchema>;
