"use server";

import { revalidatePath } from "next/cache";
import { deleteTrip, updateTrip } from "@/services/tripService";

type UpdateTripActionInput = {
  tripId: string;
  title: string;
  region: string;
  country: string;
  start_date: string;
  end_date: string;
};

export async function updateTripAction(input: UpdateTripActionInput) {
  const tripId = input.tripId.trim();
  const title = input.title.trim();

  if (!tripId || !title || !input.start_date || !input.end_date) {
    return { error: "Trip, Titel, Start- und Enddatum sind erforderlich." };
  }

  try {
    await updateTrip(tripId, {
      title,
      region: input.region.trim() || null,
      country: input.country.trim() || null,
      start_date: input.start_date,
      end_date: input.end_date,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Trip konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath(`/trips/${tripId}`);
  revalidatePath("/trips");
  revalidatePath("/places");

  return { success: true };
}

export async function deleteTripAction(tripId: string) {
  const normalizedTripId = tripId.trim();

  if (!normalizedTripId) {
    return { error: "Trip ist erforderlich." };
  }

  try {
    await deleteTrip(normalizedTripId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Trip konnte nicht geloescht werden.";

    return { error: message };
  }

  revalidatePath("/trips");
  revalidatePath("/places");

  return { success: true };
}
