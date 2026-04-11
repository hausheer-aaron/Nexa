import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  assignPlaceToTrip,
  getCurrentUserPlacesForTrip,
  getCurrentUserTripsForPlace,
  getCurrentUserTripsForPlaces,
  removePlaceFromTrip,
} from "@/services/tripPlaceService";
import { makePlace, makeTrip } from "@/test/fixtures";

const { requireAuthenticatedSupabase } = vi.hoisted(() => ({
  requireAuthenticatedSupabase: vi.fn(),
}));

vi.mock("@/services/service-utils", () => ({
  requireAuthenticatedSupabase,
}));

describe("tripPlaceService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty trip list when a place has no assignments", async () => {
    const eq = vi.fn().mockResolvedValue({ data: [], error: null });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserTripsForPlace("place-1")).resolves.toEqual([]);
  });

  it("loads all places assigned to a trip", async () => {
    const order = vi.fn().mockResolvedValue({
      data: [makePlace(), makePlace({ id: "place-2", name: "Second" })],
      error: null,
    });
    const inMock = vi.fn().mockReturnValue({ order });
    const eqPlaces = vi.fn().mockReturnValue({ in: inMock });
    const selectPlaces = vi.fn().mockReturnValue({ eq: eqPlaces });

    const eqTripPlaces = vi.fn().mockResolvedValue({
      data: [{ place_id: "place-1" }, { place_id: "place-2" }],
      error: null,
    });
    const selectTripPlaces = vi.fn().mockReturnValue({ eq: eqTripPlaces });

    const from = vi.fn((table: string) => {
      if (table === "trip_places") {
        return { select: selectTripPlaces };
      }

      if (table === "places") {
        return { select: selectPlaces };
      }

      throw new Error(`Unexpected table ${table}`);
    });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserPlacesForTrip("trip-1")).resolves.toEqual([
      makePlace(),
      makePlace({ id: "place-2", name: "Second" }),
    ]);
    expect(order).toHaveBeenCalledWith("created_at", { ascending: true });
  });

  it("groups trips by place id", async () => {
    const order = vi.fn().mockResolvedValue({
      data: [makeTrip(), makeTrip({ id: "trip-2", title: "Second Trip" })],
      error: null,
    });
    const inTrips = vi.fn().mockReturnValue({ order });
    const eqTrips = vi.fn().mockReturnValue({ in: inTrips });
    const selectTrips = vi.fn().mockReturnValue({ eq: eqTrips });

    const inTripPlaces = vi.fn().mockResolvedValue({
      data: [
        { place_id: "place-1", trip_id: "trip-1" },
        { place_id: "place-2", trip_id: "trip-2" },
        { place_id: "place-1", trip_id: "trip-2" },
      ],
      error: null,
    });
    const selectTripPlaces = vi.fn().mockReturnValue({ in: inTripPlaces });

    const from = vi.fn((table: string) => {
      if (table === "trip_places") {
        return { select: selectTripPlaces };
      }

      if (table === "trips") {
        return { select: selectTrips };
      }

      throw new Error(`Unexpected table ${table}`);
    });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(
      getCurrentUserTripsForPlaces(["place-1", "place-2"]),
    ).resolves.toEqual({
      "place-1": [makeTrip(), makeTrip({ id: "trip-2", title: "Second Trip" })],
      "place-2": [makeTrip({ id: "trip-2", title: "Second Trip" })],
    });
  });

  it("returns an existing assignment instead of inserting a duplicate", async () => {
    const placeMaybeSingle = vi.fn().mockResolvedValue({
      data: { id: "place-1" },
      error: null,
    });
    const placeEqUser = vi.fn().mockReturnValue({ maybeSingle: placeMaybeSingle });
    const placeEqId = vi.fn().mockReturnValue({ eq: placeEqUser });
    const placeSelect = vi.fn().mockReturnValue({ eq: placeEqId });

    const tripMaybeSingle = vi.fn().mockResolvedValue({
      data: { id: "trip-1" },
      error: null,
    });
    const tripEqUser = vi.fn().mockReturnValue({ maybeSingle: tripMaybeSingle });
    const tripEqId = vi.fn().mockReturnValue({ eq: tripEqUser });
    const tripSelect = vi.fn().mockReturnValue({ eq: tripEqId });

    const existingMaybeSingle = vi.fn().mockResolvedValue({
      data: { id: "tp-1", place_id: "place-1", trip_id: "trip-1" },
      error: null,
    });
    const existingEqTrip = vi.fn().mockReturnValue({ maybeSingle: existingMaybeSingle });
    const existingEqPlace = vi.fn().mockReturnValue({ eq: existingEqTrip });
    const tripPlacesSelect = vi.fn().mockReturnValue({ eq: existingEqPlace });

    const from = vi.fn((table: string) => {
      if (table === "places") {
        return { select: placeSelect };
      }

      if (table === "trips") {
        return { select: tripSelect };
      }

      if (table === "trip_places") {
        return { select: tripPlacesSelect };
      }

      throw new Error(`Unexpected table ${table}`);
    });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(assignPlaceToTrip("place-1", "trip-1")).resolves.toEqual({
      id: "tp-1",
      place_id: "place-1",
      trip_id: "trip-1",
    });
  });

  it("removes an assignment after verifying ownership", async () => {
    const placeMaybeSingle = vi.fn().mockResolvedValue({
      data: { id: "place-1" },
      error: null,
    });
    const placeEqUser = vi.fn().mockReturnValue({ maybeSingle: placeMaybeSingle });
    const placeEqId = vi.fn().mockReturnValue({ eq: placeEqUser });
    const placeSelect = vi.fn().mockReturnValue({ eq: placeEqId });

    const tripMaybeSingle = vi.fn().mockResolvedValue({
      data: { id: "trip-1" },
      error: null,
    });
    const tripEqUser = vi.fn().mockReturnValue({ maybeSingle: tripMaybeSingle });
    const tripEqId = vi.fn().mockReturnValue({ eq: tripEqUser });
    const tripSelect = vi.fn().mockReturnValue({ eq: tripEqId });

    const eqTrip = vi.fn().mockResolvedValue({ error: null });
    const eqPlace = vi.fn().mockReturnValue({ eq: eqTrip });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqPlace });

    const from = vi.fn((table: string) => {
      if (table === "places") {
        return { select: placeSelect };
      }

      if (table === "trips") {
        return { select: tripSelect };
      }

      if (table === "trip_places") {
        return { delete: deleteMock };
      }

      throw new Error(`Unexpected table ${table}`);
    });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(
      removePlaceFromTrip("place-1", "trip-1"),
    ).resolves.toBeUndefined();
    expect(eqPlace).toHaveBeenCalledWith("place_id", "place-1");
    expect(eqTrip).toHaveBeenCalledWith("trip_id", "trip-1");
  });
});
