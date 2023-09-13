import { z } from 'zod';

export const signupInputSchema = z.object({
  first_name: z.string({
    required_error: 'Must provide a first name for signup',
  }),
  last_name: z.string({
    required_error: 'Must provide a last name for signup',
  }),
  email_address: z.string({ required_error: 'Must provide an email for signup' }).email({
    message: 'Invalid email address',
  }),
  password: z.string({ required_error: 'Password is required' }).min(5),
});

export type SignupRequestDto = z.infer<typeof signupInputSchema>;

export const loginInputSchema = z.object({
  email_address: z.string({ required_error: 'Must provide an email for login' }).email({
    message: 'Invalid email address',
  }),
  password: z.string({ required_error: 'Password is required' }).min(5),
});

export type LoginRequestDto = z.infer<typeof loginInputSchema>;

export const transactionSchema = z.object({
  id: z.string(),
  wallet_id: z.string(),
  from: z.string(),
  status: z.enum(['pending', 'success', 'failed']),
  type: z.enum(['transfer', 'payment_link']),
  amount: z.object({
    value: z.number(),
    currency: z.enum(['USD', 'NGN']),
  }),
  created_at: z.string().datetime(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const paymentLinkSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  slug: z.string(),
  amount: z.number(),
  type: z.enum(['basic', 'one-time']).optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  collected_totalamount: z.number().optional().default(0),
  num_of_transactions: z.number().optional().default(0),
});

export type PaymentLink = z.infer<typeof paymentLinkSchema>;

export const walletSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  balance: z.number(),
  unresolved: z.number(),
  currency: z.enum(['USD', 'NGN']).default('NGN'),
});

export type Wallet = z.infer<typeof walletSchema>;

export const userSchema = z.object({
  id: z.string(),
  // wallet_id: z.string(),
  // payment_link_id: z.string(),
  email_address: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  prefs: z.object({
    currency: z.enum(['USD', 'NGN']).default('NGN'),
    notification: z.enum(['all', 'priority', 'email', 'none']).optional(),
  }),
});

export type User = z.infer<typeof userSchema>;

export const cardInformationInputSchema = z.object({
  idempotencyKey: z.string(),
  keyId: z.string(),
  encryptedData: z.string(),
  name: z.string(),
  city: z.string(),
  country: z.string(),
  line1: z.string(),
  line2: z.string(),
  district: z.string(),
  postalCode: z.string(),
  number: z.string(),
  cvv: z.string(),
  expMonth: z.string(),
  expYear: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  sessionId: z.string(),
  ipAddress: z.string(),
  amount: z.string(),
  currency: z.string(),
});

export type CardInformation = z.infer<typeof cardInformationInputSchema>;
