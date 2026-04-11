import { describe, expect, it } from "vitest";
import { sortPlacesByCreatedAtDesc, sortTripsByStartDate } from "@/lib/sorting/entities";
import type { Place, Trip } from "@/types/entities";

const trips: Trip[] = [
  {
    id: "trip-2",
    user_id: "user-1",
    title: "Late Trip",
    region: null,
    country: null,
    start_date: "2026-06-10",
    end_date: "2026-06-15",
    created_at: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "trip-1",
    user_id: "user-1",
    title: "Early Trip",
    region: null,
    country: null,
    start_date: "2026-04-01",
    end_date: "2026-04-07",
    created_at: "2026-02-01T10:00:00.000Z",
  },
];

const places: Place[] = [
  {
    id: "place-1",
    user_id: "user-1",
    name: "Older place",
    address: null,
    latitude: 47.37,
    longitude: 8.54,
    note: null,
    country_code: null,
    country_name: null,
    created_at: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "place-2",
    user_id: "user-1",
    name: "Newer place",
    address: null,
    latitude: 47.38,
    longitude: 8.55,
    note: null,
    country_code: null,
    country_name: null,
    created_at: "2026-03-04T10:00:00.000Z",
  },
];

describe("entity sorting helpers", () => {
  it("sorts trips by start date ascending", () => {
    expect(sortTripsByStartDate(trips).map((trip) => trip.id)).toEqual([
      "trip-1",
      "trip-2",
    ]);
  });

  it("sorts places by created_at descending", () => {
    expect(sortPlacesByCreatedAtDesc(places).map((place) => place.id)).toEqual([
      "place-2",
      "place-1",
    ]);
  });
});
