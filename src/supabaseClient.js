import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const hasSupabase = Boolean(supabaseUrl && supabaseKey);

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseKey)
  : null;
