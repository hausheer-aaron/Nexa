import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAuthenticatedSupabase() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}
