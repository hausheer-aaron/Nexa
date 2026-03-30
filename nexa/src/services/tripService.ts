import type { CreateTripInput, Trip } from "@/types/entities";
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
