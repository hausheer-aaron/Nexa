"use server";

import { revalidatePath } from "next/cache";
import { createTrip } from "@/services/tripService";

export async function createTripAction(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  const region = formData.get("region")?.toString().trim() ?? "";
  const country = formData.get("country")?.toString().trim() ?? "";
  const start_date = formData.get("start_date")?.toString() ?? "";
  const end_date = formData.get("end_date")?.toString() ?? "";

  if (!title || !start_date || !end_date) {
    return { error: "Titel, Startdatum und Enddatum sind erforderlich." };
  }

  try {
    await createTrip({
      title,
      region: region || null,
      country: country || null,
      start_date,
      end_date,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Trip konnte nicht gespeichert werden.";

    return { error: message };
  }

  revalidatePath("/trips");

  return { success: true };
}
