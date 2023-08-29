import { NextApiRequest, NextApiResponse } from "next";
import { superSupabase } from "@/lib/supabase";
import { Db } from "@/lib/constants";
import { User, Wallet } from "@/types";
import { deserialize } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id, email_address, first_name, last_name } = deserialize<{
    user_id: string;
    email_address: string;
    first_name: string;
    last_name: string;
  }>(req.body);

  try {
    await superSupabase.from(Db.users__table).upsert(<User>{
      id: user_id,
      email_address,
      first_name,
      last_name,
    });

    const { data: walletData } = await superSupabase
      .from(Db.wallets__table)
      .upsert(<Wallet>{
        user_id,
        balance: 100.0,
        unresolved: 0.0,
      })
      .select("id")
      .single();

    await superSupabase.from(Db.users__table).insert(<User>{
      first_name,
      last_name,
      email_address,
      wallet_id: walletData?.id,
    });

    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error, "Failed to create account.");
    return res.status(500).json({ message: "Failed to create account." });
  }
}
