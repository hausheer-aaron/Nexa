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
    throw new Error("Name, latitude and longitude are required.");
  }

  const latitude = Number(latitudeRaw);
  const longitude = Number(longitudeRaw);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    throw new Error("Latitude and longitude must be valid numbers.");
  }

  await createPlace({
    name,
    address: address || null,
    latitude,
    longitude,
    note: note || null,
    country_code: country_code || null,
    country_name: country_name || null,
  });

  revalidatePath("/places");
}
