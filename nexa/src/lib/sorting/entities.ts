import type { Place, Trip } from "@/types/entities";

export function sortTripsByStartDate(trips: Trip[]) {
  return [...trips].sort((left, right) =>
    left.start_date.localeCompare(right.start_date),
  );
}

export function sortPlacesByCreatedAtDesc(places: Place[]) {
  return [...places].sort((left, right) =>
    right.created_at.localeCompare(left.created_at),
  );
}
