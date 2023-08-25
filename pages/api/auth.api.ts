import { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';
import jwt from 'jsonwebtoken';
import { superSupabase } from '@/lib/supabase';
import { Db } from '@/lib/constants';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { address, chainId, message, signature } = JSON.parse(request.body);

  const recoveredAddress = utils.verifyMessage(message, signature);

  if (utils.getAddress(address) === recoveredAddress) {
    const token = jwt.sign({ address }, `${process.env.SUPABASE_JWT_SECRET_KEY}`, {
      expiresIn: '7d',
    });

    const { data: user, error } = await superSupabase.from(Db.users__table).select().match({ address }).single();
    if (error?.code === 'PGRST116') {
      const appId = utils.base64.encode((address as string).slice(0, 12) + `${Date.now()}`).replaceAll('=', '');

      const userData = { app_id: appId, active_chain_id: chainId, address };
      const integrationData = { id: appId, active_chain_id: chainId, address };

      await superSupabase.from(Db.users__table).upsert(userData);
      await superSupabase.from(Db.integrations__table).upsert(integrationData);

      return response.status(200).json({ success: true, token, user: userData });
    }

    return response.status(200).json({ success: true, token, user });
  }
  return response.status(400).json({ success: false, error: 'Signature is invalid' });
}
