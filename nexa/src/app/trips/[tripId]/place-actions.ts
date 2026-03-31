"use server";

import { revalidatePath } from "next/cache";
import {
  assignPlaceToTrip,
  removePlaceFromTrip,
} from "@/services/tripPlaceService";

type TripPlaceActionInput = {
  tripId: string;
  placeId: string;
};

export async function assignPlaceToTripFromTripAction(
  input: TripPlaceActionInput,
) {
  const tripId = input.tripId.trim();
  const placeId = input.placeId.trim();

  if (!tripId || !placeId) {
    return { error: "Trip und Place sind erforderlich." };
  }

  try {
    await assignPlaceToTrip(placeId, tripId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Zuordnung konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath(`/trips/${tripId}`);
  revalidatePath(`/places/${placeId}`);
  revalidatePath("/trips");
  revalidatePath("/places");

  return { success: true };
}

export async function removePlaceFromTripAction(input: TripPlaceActionInput) {
  const tripId = input.tripId.trim();
  const placeId = input.placeId.trim();

  if (!tripId || !placeId) {
    return { error: "Trip und Place sind erforderlich." };
  }

  try {
    await removePlaceFromTrip(placeId, tripId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Zuordnung konnte nicht entfernt werden.";

    return { error: message };
  }

  revalidatePath(`/trips/${tripId}`);
  revalidatePath(`/places/${placeId}`);
  revalidatePath("/trips");
  revalidatePath("/places");

  return { success: true };
}
