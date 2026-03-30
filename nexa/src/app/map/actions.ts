"use server";

import { revalidatePath } from "next/cache";
import { createPlace } from "@/services/placeService";

type CreatePlaceFromMapInput = {
  latitude: number;
  longitude: number;
  name: string;
  note?: string;
  address?: string;
  country_code?: string;
  country_name?: string;
};

export async function createPlaceFromMapAction(
  input: CreatePlaceFromMapInput,
) {
  const name = input.name.trim();
  const note = input.note?.trim() ?? "";
  const address = input.address?.trim() ?? "";
  const country_code = input.country_code?.trim() ?? "";
  const country_name = input.country_name?.trim() ?? "";

  if (!name) {
    return { error: "Name ist erforderlich." };
  }

  if (!Number.isFinite(input.latitude) || !Number.isFinite(input.longitude)) {
    return { error: "Ungueltige Koordinaten." };
  }

  try {
    await createPlace({
      name,
      note: note || null,
      latitude: input.latitude,
      longitude: input.longitude,
      address: address || null,
      country_code: country_code || null,
      country_name: country_name || null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Place konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath("/map");
  revalidatePath("/places");

  return { success: true };
}
