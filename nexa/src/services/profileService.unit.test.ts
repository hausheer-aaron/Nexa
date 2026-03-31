import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUserProfile } from "@/services/profileService";
import { makeProfile } from "@/test/fixtures";

const { requireAuthenticatedSupabase } = vi.hoisted(() => ({
  requireAuthenticatedSupabase: vi.fn(),
}));

vi.mock("@/services/service-utils", () => ({
  requireAuthenticatedSupabase,
}));

describe("profileService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads the current users profile", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: makeProfile(),
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserProfile()).resolves.toEqual(makeProfile());
    expect(from).toHaveBeenCalledWith("profiles");
    expect(eq).toHaveBeenCalledWith("id", "user-1");
  });

  it("returns null when no profile exists yet", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: null,
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserProfile()).resolves.toBeNull();
  });

  it("throws when the profile query fails", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "profile query failed" },
    });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    requireAuthenticatedSupabase.mockResolvedValue({
      supabase: { from },
      user: { id: "user-1" },
    });

    await expect(getCurrentUserProfile()).rejects.toThrow(
      "profile query failed",
    );
  });
});
