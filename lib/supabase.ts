import { createClient, User } from '@supabase/supabase-js';

export const supabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
);

export const superSupabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.SUPABASE_SERVICE_ROLE_KEY}`
);

export interface SupabaseUser extends User {}
