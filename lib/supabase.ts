import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY}`,
  {
    global: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEMO_TOKEN}`,
        // Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem(token__key) : ''}`,
      },
    },
  }
);

export const superSupabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.SUPABASE_SECRET_KEY}`
);
