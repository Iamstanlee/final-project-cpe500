import { NextApiRequest, NextApiResponse } from 'next';
import { superSupabase } from '@/lib/supabase';
import { Db, PaymentLinkType } from '@/lib/constants';
import { PaymentLink, User, Wallet } from '@/types';
import { deserialize, generateRandomId } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, email_address, first_name, last_name } = deserialize<{
    user_id: string;
    email_address: string;
    first_name: string;
    last_name: string;
  }>(req.body);

  try {
    const { error: createUserError } = await superSupabase.from(Db.users__table).upsert(<User>{
      id: user_id,
      email_address,
      first_name,
      last_name,
    });

    const { data: walletData, error: walletError } = await superSupabase
      .from(Db.wallets__table)
      .upsert(<Wallet>{
        user_id,
        balance: 100.0,
        unresolved: 0.0,
      })
      .select('id')
      .single();

    // TODO: generate random slug and check if it exists
    const { data: paymentData, error: paymentError } = await superSupabase
      .from(Db.payment_link__table)
      .upsert(<PaymentLink>{
        user_id,
        slug: generateRandomId(),
        type: PaymentLinkType.basic,
        metadata: {
          user_id,
          user_name: `${first_name} ${last_name}`,
          user_email: email_address,
        },
      })
      .select()
      .single();

    const { error: updateUserError } = await superSupabase
      .from(Db.users__table)
      .update(<User>{
        wallet_id: walletData?.id,
      })
      .eq('id', user_id)
      .select();

    if (createUserError || walletError || paymentError || updateUserError) {
      console.error(createUserError, walletError, paymentError, updateUserError, 'Failed to create account.');
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
