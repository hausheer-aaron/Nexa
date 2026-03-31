import type { Place, Profile, Trip } from "@/types/entities";

export function makeTrip(overrides: Partial<Trip> = {}): Trip {
  return {
    id: "trip-1",
    user_id: "user-1",
    title: "Test Trip",
    region: "Zurich",
    country: "Switzerland",
    start_date: "2026-04-01",
    end_date: "2026-04-04",
    created_at: "2026-03-01T10:00:00.000Z",
    ...overrides,
  };
}

export function makePlace(overrides: Partial<Place> = {}): Place {
  return {
    id: "place-1",
    user_id: "user-1",
    name: "Test Place",
    address: "Test Street 1",
    latitude: 47.3769,
    longitude: 8.5417,
    note: "Test note",
    country_code: "CH",
    country_name: "Switzerland",
    created_at: "2026-03-01T10:00:00.000Z",
    ...overrides,
  };
}

export function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "user-1",
    email: "user@example.com",
    created_at: "2026-01-01T10:00:00.000Z",
    ...overrides,
  };
}
