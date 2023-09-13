import { NextApiRequest, NextApiResponse } from 'next';
import { superSupabase } from '@/lib/supabase';
import { Db, PaymentLinkType } from '@/lib/constants';
import { PaymentLink, Transaction, User, Wallet } from '@/types';
import { deserialize, generateRandomId } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, email_address, first_name, last_name } = deserialize<{
    user_id: string;
    email_address: string;
    first_name: string;
    last_name: string;
  }>(req.body);

  try {
    const { error: createUserError } = await superSupabase.from(Db.users__table).insert(<User>{
      email_address,
      first_name,
      last_name,
      id: user_id,
    });

    // TODO: generate random slug and check if it exists
    const { error: createPaymentLinkError } = await superSupabase.from(Db.payment_link__table).insert(<PaymentLink>{
      user_id,
      slug: generateRandomId(),
      type: PaymentLinkType.basic,
      first_name: first_name,
      last_name: last_name,
      email_address: email_address,
    });

    const { error: createWalletError, data: walletData } = await superSupabase
      .from(Db.wallets__table)
      .insert(<Wallet>{
        user_id,
        balance: 1000000,
      })
      .select('id')
      .single();

    const { error: createBonusTxError } = await superSupabase.from(Db.transactions__table).insert(<Transaction>{
      wallet_id: walletData?.id,
      from: 'Signup Bonus',
      status: 'success',
      type: 'transfer',
      amount: {
        value: 1000000,
        currency: 'NGN',
      },
    });

    if (createUserError || createWalletError || createPaymentLinkError || createBonusTxError) {
      console.error(createUserError, createWalletError, createPaymentLinkError, createBonusTxError);
      return res.status(500).json({ message: 'Failed to create account.' });
    }

    return res.status(200).json({
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error(error, 'Failed to create account.');
    return res.status(500).json({ message: 'Failed to create account.' });
  }
}
