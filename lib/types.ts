import { z } from 'zod';

export const transactionSchema = z.object({
  avatar: z.string(),
  id: z.string(),
  title: z.string(),
  status: z.string(),
  type: z.enum(['checkout', 'payment_link']),
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
  title: z.string({ required_error: "Must provide a name/title for your payment link" }),
  description: z.string({ required_error: "Description is required" }),
  settlement_token: z.string(),
  amount: z.number({ required_error: "A payable amount has to be provided" }),
  app_id: z.string(),
});

export type PaymentLinkInput = z.infer<typeof paymentLinkInputSchema>;

export const integrationSchema = z.object({
  id: z.string(),
  business_name: z.string(),
  address: z.string(),
  active_chain_id: z.string(),
});

export type Integration = z.infer<typeof integrationSchema>;

export const userSchema = z.object({
  address: z.string(),
  email_address: z.string().email(),
  app_id: z.string(),
  active_chain_id: z.string(),
  business_name: z.string(),
  twitter_handle: z.string(),
  website_url: z.string(),
});

export type User = z.infer<typeof userSchema>;
