"use server";

import { revalidatePath } from "next/cache";
import { assignPlaceToTrip } from "@/services/tripPlaceService";

type AssignPlaceToTripInput = {
  placeId: string;
  tripId: string;
};

export async function assignPlaceToTripAction(
  input: AssignPlaceToTripInput,
) {
  const placeId = input.placeId.trim();
  const tripId = input.tripId.trim();

  if (!placeId || !tripId) {
    return { error: "Place und Trip sind erforderlich." };
  }

  try {
    await assignPlaceToTrip(placeId, tripId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Zuordnung konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath(`/places/${placeId}`);
  revalidatePath("/places");
  revalidatePath("/trips");

  return { success: true };
}
