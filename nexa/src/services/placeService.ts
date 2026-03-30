import type { CreatePlaceInput, Place, UpdatePlaceInput } from "@/types/entities";
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

export async function getCurrentUserPlaceCount(): Promise<number> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { count, error } = await supabase
    .from("places")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function getCurrentUserRecentPlaces(limit = 4): Promise<Place[]> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUserPlaceById(
  placeId: string,
): Promise<Place | null> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", placeId)
    .eq("user_id", user.id)
    .maybeSingle();

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

export async function updatePlace(
  placeId: string,
  input: UpdatePlaceInput,
): Promise<Place> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("places")
    .update(input)
    .eq("id", placeId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletePlace(placeId: string): Promise<void> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { error } = await supabase
    .from("places")
    .delete()
    .eq("id", placeId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
