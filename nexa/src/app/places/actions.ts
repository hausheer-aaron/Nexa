"use server";

import { revalidatePath } from "next/cache";
import { createPlace } from "@/services/placeService";

export async function createPlaceAction(formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const address = formData.get("address")?.toString().trim() ?? "";
  const latitudeRaw = formData.get("latitude")?.toString() ?? "";
  const longitudeRaw = formData.get("longitude")?.toString() ?? "";
  const note = formData.get("note")?.toString().trim() ?? "";
  const country_code = formData.get("country_code")?.toString().trim() ?? "";
  const country_name = formData.get("country_name")?.toString().trim() ?? "";

  if (!name || !latitudeRaw || !longitudeRaw) {
    return { error: "Name, Latitude und Longitude sind erforderlich." };
  }

  const latitude = Number(latitudeRaw);
  const longitude = Number(longitudeRaw);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return { error: "Latitude und Longitude muessen gueltige Zahlen sein." };
  }

  try {
    await createPlace({
      name,
      address: address || null,
      latitude,
      longitude,
      note: note || null,
      country_code: country_code || null,
      country_name: country_name || null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Place konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath("/places");

  return { success: true };
}
