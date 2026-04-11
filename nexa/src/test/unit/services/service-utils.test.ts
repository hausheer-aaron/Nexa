import { beforeEach, describe, expect, it, vi } from "vitest";
import { requireAuthenticatedSupabase } from "@/services/service-utils";

const { getSupabaseServerClient } = vi.hoisted(() => ({
  getSupabaseServerClient: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient,
}));

describe("service-utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the authenticated supabase client and user", async () => {
    const supabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: "user-1", email: "user@example.com" } },
          error: null,
        }),
      },
    };

    getSupabaseServerClient.mockResolvedValue(supabase);

    await expect(requireAuthenticatedSupabase()).resolves.toEqual({
      supabase,
      user: { id: "user-1", email: "user@example.com" },
    });
  });

  it("throws when supabase returns an auth error", async () => {
    getSupabaseServerClient.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: { message: "session failed" },
        }),
      },
    });

    await expect(requireAuthenticatedSupabase()).rejects.toThrow(
      "session failed",
    );
  });

  it("throws when no user is available", async () => {
    getSupabaseServerClient.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
    });

    await expect(requireAuthenticatedSupabase()).rejects.toThrow("Unauthorized");
  });
});
