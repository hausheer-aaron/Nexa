import type { Profile } from "@/types/entities";
import { requireAuthenticatedSupabase } from "@/services/service-utils";

export async function getCurrentUserProfile(): Promise<Profile | null> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
