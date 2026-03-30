import type { CreatePlaceInput, Place } from "@/types/entities";
import { requireAuthenticatedSupabase } from "@/services/service-utils";

export async function getCurrentUserPlaces(): Promise<Place[]> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createPlace(input: CreatePlaceInput): Promise<Place> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("places")
    .insert({
      ...input,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
