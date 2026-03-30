"use server";

import { revalidatePath } from "next/cache";
import { deletePlace, updatePlace } from "@/services/placeService";

type UpdatePlaceActionInput = {
  placeId: string;
  name: string;
  address: string;
  note: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country_name: string;
};

export async function updatePlaceAction(input: UpdatePlaceActionInput) {
  const placeId = input.placeId.trim();
  const name = input.name.trim();

  if (!placeId || !name) {
    return { error: "Place und Name sind erforderlich." };
  }

  if (!Number.isFinite(input.latitude) || !Number.isFinite(input.longitude)) {
    return { error: "Latitude und Longitude muessen gueltige Zahlen sein." };
  }

  try {
    await updatePlace(placeId, {
      name,
      address: input.address.trim() || null,
      note: input.note.trim() || null,
      latitude: input.latitude,
      longitude: input.longitude,
      country_code: input.country_code.trim() || null,
      country_name: input.country_name.trim() || null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Place konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath(`/places/${placeId}`);
  revalidatePath("/places");
  revalidatePath("/map");
  revalidatePath("/trips");

  return { success: true };
}

export async function deletePlaceAction(placeId: string) {
  const normalizedPlaceId = placeId.trim();

  if (!normalizedPlaceId) {
    return { error: "Place ist erforderlich." };
  }

  try {
    await deletePlace(normalizedPlaceId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Place konnte nicht geloescht werden.";

    return { error: message };
  }

  revalidatePath("/places");
  revalidatePath("/map");
  revalidatePath("/trips");

  return { success: true };
}
