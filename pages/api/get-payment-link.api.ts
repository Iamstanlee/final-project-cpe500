import { NextApiRequest, NextApiResponse } from "next";
import { superSupabase } from "@/lib/supabase";
import { Db } from "@/lib/constants";
import { deserialize } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = deserialize<{
    slug: string;
  }>(req.body);

  try {
    const { data, error } = await superSupabase
      .from(Db.payment_link__table)
      .select("*")
      .match({ slug })
      .single();

    if (error) {
      console.error(error, "Failed to fetch user.");
      return res.status(500).json({ message: "Failed to fetch user." });
    }

    return res.status(200).json({
      message: "Successful",
      user: data,
    });
  } catch (error) {
    console.error(error, "Failed to fetch user.");
    return res.status(500).json({ message: "Failed to fetch user." });
  }
}
