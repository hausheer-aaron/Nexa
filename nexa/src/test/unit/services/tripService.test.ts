import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createTrip,
  deleteTrip,
  getCurrentUserRecentTrips,
  getCurrentUserTripById,
  getCurrentUserTripCount,
  getCurrentUserTrips,
  updateTrip,
} from "@/services/tripService";

const { requireAuthenticatedSupabase } = vi.hoisted(() => ({
  requireAuthenticatedSupabase: vi.fn(),
}));

vi.mock("@/services/service-utils", () => ({
  requireAuthenticatedSupabase,
}));

describe("tripService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads all trips for the current user", async () => {
    const order = vi.fn().mockResolvedValue({
      data: [{ id: "trip-1", title: "Swiss Spring" }],
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    const result = await getCurrentUserTrips();

    expect(from).toHaveBeenCalledWith("trips");
    expect(select).toHaveBeenCalledWith("*");
    expect(eq).toHaveBeenCalledWith("user_id", "user-1");
    expect(order).toHaveBeenCalledWith("start_date", { ascending: true });
    expect(result).toEqual([{ id: "trip-1", title: "Swiss Spring" }]);
  });

  it("creates a trip with the current user id", async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: "trip-2", title: "Lisbon Week" },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ insert });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-99" },
    });

    const result = await createTrip({
      title: "Lisbon Week",
      region: "Lisbon",
      country: "Portugal",
      start_date: "2026-05-01",
      end_date: "2026-05-10",
    });

    expect(insert).toHaveBeenCalledWith({
      title: "Lisbon Week",
      region: "Lisbon",
      country: "Portugal",
      start_date: "2026-05-01",
      end_date: "2026-05-10",
      user_id: "user-99",
    });
    expect(result).toEqual({ id: "trip-2", title: "Lisbon Week" });
  });

  it("loads the trip count for the current user", async () => {
    const eq = vi.fn().mockResolvedValue({
      count: 4,
      error: null,
    });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserTripCount()).resolves.toBe(4);
  });

  it("loads recent trips in descending created order", async () => {
    const limit = vi.fn().mockResolvedValue({
      data: [{ id: "trip-3", title: "Recent Trip" }],
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

    await expect(getCurrentUserRecentTrips(2)).resolves.toEqual([
      { id: "trip-3", title: "Recent Trip" },
    ]);
    expect(order).toHaveBeenCalledWith("created_at", { ascending: false });
    expect(limit).toHaveBeenCalledWith(2);
  });

  it("loads a single trip by id", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: { id: "trip-1", title: "Found Trip" },
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

    await expect(getCurrentUserTripById("trip-1")).resolves.toEqual({
      id: "trip-1",
      title: "Found Trip",
    });
  });

  it("updates a trip for the current user", async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: "trip-1", title: "Updated" },
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
      updateTrip("trip-1", {
        title: "Updated",
      }),
    ).resolves.toEqual({ id: "trip-1", title: "Updated" });
    expect(update).toHaveBeenCalledWith({ title: "Updated" });
  });

  it("deletes a trip for the current user", async () => {
    const eqUser = vi.fn().mockResolvedValue({ error: null });
    const eqId = vi.fn().mockReturnValue({ eq: eqUser });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqId });
    const from = vi.fn().mockReturnValue({ delete: deleteMock });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(deleteTrip("trip-1")).resolves.toBeUndefined();
    expect(eqId).toHaveBeenCalledWith("id", "trip-1");
    expect(eqUser).toHaveBeenCalledWith("user_id", "user-1");
  });

  it("throws when loading trips fails", async () => {
    const order = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "trip query failed" },
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserTrips()).rejects.toThrow("trip query failed");
  });
});
