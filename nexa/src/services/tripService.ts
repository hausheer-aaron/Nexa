import type { CreateTripInput, Trip, UpdateTripInput } from "@/types/entities";
import { requireAuthenticatedSupabase } from "@/services/service-utils";

export async function getCurrentUserTrips(): Promise<Trip[]> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUserTripCount(): Promise<number> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { count, error } = await supabase
    .from("trips")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function getCurrentUserRecentTrips(limit = 3): Promise<Trip[]> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUserTripById(
  tripId: string,
): Promise<Trip | null> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createTrip(input: CreateTripInput): Promise<Trip> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("trips")
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

export async function updateTrip(
  tripId: string,
  input: UpdateTripInput,
): Promise<Trip> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("trips")
    .update(input)
    .eq("id", tripId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTrip(tripId: string): Promise<void> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { error } = await supabase
    .from("trips")
    .delete()
    .eq("id", tripId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
