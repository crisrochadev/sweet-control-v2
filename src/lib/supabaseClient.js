import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.VUE_APP_URL_SUPABASE,
  process.env.VUE_APP_KEY_SUPABASE
);
