import { NextApiRequest, NextApiResponse } from "next";
import { superSupabase } from "@/lib/supabase";
import { Db } from "@/lib/constants";
import { PaymentLink } from "@/types";
import { generateUid, deserialize } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id, email_address, first_name, last_name, amount } =
    deserialize<{
      user_id: string;
      email_address: string;
      first_name: string;
      last_name: string;
      amount: number;
    }>(req.body);

  try {
    // TODo: generate random slug and check if it exists
    await superSupabase.from(Db.payment_link__table).upsert(<PaymentLink>{
      user_id,
      slug: generateUid(),
      amount: amount,
      collected_totalamount: 0,
      num_of_transactions: 0,
      metadata: {
        user_id,
        user_name: `${first_name} ${last_name}`,
        user_email: email_address,
      },
    });

    return res
      .status(200)
      .json({ message: "Payment Link created successfully" });
  } catch (error) {
    console.error(error, "Failed to create payment link.");
    return res.status(500).json({ message: "Failed to create payment link." });
  }
}
