import type { Place, Trip, TripPlace } from "@/types/entities";
import { requireAuthenticatedSupabase } from "@/services/service-utils";

export async function getCurrentUserTripsForPlace(
  placeId: string,
): Promise<Trip[]> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data: tripPlaces, error: tripPlacesError } = await supabase
    .from("trip_places")
    .select("trip_id")
    .eq("place_id", placeId);

  if (tripPlacesError) {
    throw new Error(tripPlacesError.message);
  }

  const tripIds = tripPlaces.map((entry) => entry.trip_id);

  if (tripIds.length === 0) {
    return [];
  }

  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user.id)
    .in("id", tripIds)
    .order("start_date", { ascending: true });

  if (tripsError) {
    throw new Error(tripsError.message);
  }

  return trips;
}

export async function getCurrentUserPlacesForTrip(
  tripId: string,
): Promise<Place[]> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data: tripPlaces, error: tripPlacesError } = await supabase
    .from("trip_places")
    .select("place_id")
    .eq("trip_id", tripId);

  if (tripPlacesError) {
    throw new Error(tripPlacesError.message);
  }

  const placeIds = tripPlaces.map((entry) => entry.place_id);

  if (placeIds.length === 0) {
    return [];
  }

  const { data: places, error: placesError } = await supabase
    .from("places")
    .select("*")
    .eq("user_id", user.id)
    .in("id", placeIds)
    .order("created_at", { ascending: true });

  if (placesError) {
    throw new Error(placesError.message);
  }

  return places;
}

export async function assignPlaceToTrip(
  placeId: string,
  tripId: string,
): Promise<TripPlace> {
  const { supabase, user } = await requireAuthenticatedSupabase();

  const [{ data: place, error: placeError }, { data: trip, error: tripError }] =
    await Promise.all([
      supabase
        .from("places")
        .select("id")
        .eq("id", placeId)
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("trips")
        .select("id")
        .eq("id", tripId)
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);

  if (placeError) {
    throw new Error(placeError.message);
  }

  if (tripError) {
    throw new Error(tripError.message);
  }

  if (!place || !trip) {
    throw new Error("Place oder Trip wurde nicht gefunden.");
  }

  const { data: existing, error: existingError } = await supabase
    .from("trip_places")
    .select("*")
    .eq("place_id", placeId)
    .eq("trip_id", tripId)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("trip_places")
    .insert({
      place_id: placeId,
      trip_id: tripId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
