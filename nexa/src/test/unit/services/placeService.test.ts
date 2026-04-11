import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createPlace,
  deletePlace,
  getCurrentUserPlaceById,
  getCurrentUserPlaceCount,
  getCurrentUserPlaces,
  getCurrentUserRecentPlaces,
  updatePlace,
} from "@/services/placeService";

const { requireAuthenticatedSupabase } = vi.hoisted(() => ({
  requireAuthenticatedSupabase: vi.fn(),
}));

vi.mock("@/services/service-utils", () => ({
  requireAuthenticatedSupabase,
}));

describe("placeService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads all places for the current user", async () => {
    const order = vi.fn().mockResolvedValue({
      data: [{ id: "place-1", name: "River Walk" }],
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    const result = await getCurrentUserPlaces();

    expect(from).toHaveBeenCalledWith("places");
    expect(select).toHaveBeenCalledWith("*");
    expect(eq).toHaveBeenCalledWith("user_id", "user-1");
    expect(order).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(result).toEqual([{ id: "place-1", name: "River Walk" }]);
  });

  it("creates a place with the current user id", async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: "place-2", name: "Hill View" },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ insert });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-99" },
    });

    const result = await createPlace({
      name: "Hill View",
      address: "Main Street",
      latitude: 47.3769,
      longitude: 8.5417,
      note: "Morning spot",
      country_code: "CH",
      country_name: "Switzerland",
    });

    expect(insert).toHaveBeenCalledWith({
      name: "Hill View",
      address: "Main Street",
      latitude: 47.3769,
      longitude: 8.5417,
      note: "Morning spot",
      country_code: "CH",
      country_name: "Switzerland",
      user_id: "user-99",
    });
    expect(result).toEqual({ id: "place-2", name: "Hill View" });
  });

  it("loads the place count for the current user", async () => {
    const eq = vi.fn().mockResolvedValue({
      count: 5,
      error: null,
    });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserPlaceCount()).resolves.toBe(5);
  });

  it("loads recent places in descending created order", async () => {
    const limit = vi.fn().mockResolvedValue({
      data: [{ id: "place-3", name: "Recent Place" }],
      error: null,
    });
    const order = vi.fn().mockReturnValue({ limit });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserRecentPlaces(2)).resolves.toEqual([
      { id: "place-3", name: "Recent Place" },
    ]);
    expect(order).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(limit).toHaveBeenCalledWith(2);
  });

  it("loads a single place by id", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: { id: "place-1", name: "Lake View" },
      error: null,
    });
    const eqUser = vi.fn().mockReturnValue({ maybeSingle });
    const eqId = vi.fn().mockReturnValue({ eq: eqUser });
    const select = vi.fn().mockReturnValue({ eq: eqId });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserPlaceById("place-1")).resolves.toEqual({
      id: "place-1",
      name: "Lake View",
    });
  });

  it("updates a place for the current user", async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: "place-1", name: "Updated Place" },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const eqUser = vi.fn().mockReturnValue({ select });
    const eqId = vi.fn().mockReturnValue({ eq: eqUser });
    const update = vi.fn().mockReturnValue({ eq: eqId });
    const from = vi.fn().mockReturnValue({ update });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(
      updatePlace("place-1", {
        name: "Updated Place",
      }),
    ).resolves.toEqual({ id: "place-1", name: "Updated Place" });
    expect(update).toHaveBeenCalledWith({ name: "Updated Place" });
  });

  it("deletes a place for the current user", async () => {
    const eqUser = vi.fn().mockResolvedValue({ error: null });
    const eqId = vi.fn().mockReturnValue({ eq: eqUser });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqId });
    const from = vi.fn().mockReturnValue({ delete: deleteMock });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(deletePlace("place-1")).resolves.toBeUndefined();
    expect(eqId).toHaveBeenCalledWith("id", "place-1");
    expect(eqUser).toHaveBeenCalledWith("user_id", "user-1");
  });

  it("throws when loading places fails", async () => {
    const order = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "place query failed" },
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserPlaces()).rejects.toThrow("place query failed");
  });
});
