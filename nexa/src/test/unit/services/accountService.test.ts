import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentAccountOverview } from "@/services/accountService";

const { getSupabaseServerClient } = vi.hoisted(() => ({
  getSupabaseServerClient: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient,
}));

function createSupabaseMock({
  userResult,
  profileResult,
  tripsResult,
  placesResult,
}: {
  userResult: {
    data: {
      user:
        | {
            id: string;
            email?: string | null;
            created_at?: string | null;
          }
        | null;
    };
    error: { message: string } | null;
  };
  profileResult?: {
    data: { email: string; created_at: string } | null;
    error: { message: string } | null;
  };
  tripsResult?: { count?: number | null; error: { message: string } | null };
  placesResult?: { count?: number | null; error: { message: string } | null };
}) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue(userResult),
    },
    from: vi.fn((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue(
                profileResult ?? { data: null, error: null },
              ),
            }),
          }),
        };
      }

      if (table === "trips") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue(
              tripsResult ?? { count: 0, error: null },
            ),
          }),
        };
      }

      if (table === "places") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue(
              placesResult ?? { count: 0, error: null },
            ),
          }),
        };
      }

      throw new Error(`Unexpected table ${table}`);
    }),
  };
}

describe("accountService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when the auth session is missing", async () => {
    getSupabaseServerClient.mockResolvedValue(
      createSupabaseMock({
        userResult: {
          data: { user: null },
          error: { message: "Auth session missing!" },
        },
      }),
    );

    await expect(getCurrentAccountOverview()).resolves.toBeNull();
  });

  it("returns null when no user exists", async () => {
    getSupabaseServerClient.mockResolvedValue(
      createSupabaseMock({
        userResult: {
          data: { user: null },
          error: null,
        },
      }),
    );

    await expect(getCurrentAccountOverview()).resolves.toBeNull();
  });

  it("returns the account overview from profile and count data", async () => {
    getSupabaseServerClient.mockResolvedValue(
      createSupabaseMock({
        userResult: {
          data: {
            user: {
              id: "user-1",
              email: "fallback@example.com",
              created_at: "2026-01-01T00:00:00.000Z",
            },
          },
          error: null,
        },
        profileResult: {
          data: {
            email: "profile@example.com",
            created_at: "2026-02-01T00:00:00.000Z",
          },
          error: null,
        },
        tripsResult: { count: 3, error: null },
        placesResult: { count: 8, error: null },
      }),
    );

    await expect(getCurrentAccountOverview()).resolves.toEqual({
      email: "profile@example.com",
      registeredAt: "2026-02-01T00:00:00.000Z",
      tripCount: 3,
      placeCount: 8,
    });
  });

  it("falls back to auth user data when no profile row exists", async () => {
    getSupabaseServerClient.mockResolvedValue(
      createSupabaseMock({
        userResult: {
          data: {
            user: {
              id: "user-1",
              email: "user@example.com",
              created_at: "2026-01-15T00:00:00.000Z",
            },
          },
          error: null,
        },
      }),
    );

    await expect(getCurrentAccountOverview()).resolves.toEqual({
      email: "user@example.com",
      registeredAt: "2026-01-15T00:00:00.000Z",
      tripCount: 0,
      placeCount: 0,
    });
  });

  it("throws when the profile query fails", async () => {
    getSupabaseServerClient.mockResolvedValue(
      createSupabaseMock({
        userResult: {
          data: { user: { id: "user-1" } },
          error: null,
        },
        profileResult: {
          data: null,
          error: { message: "profile failed" },
        },
      }),
    );

    await expect(getCurrentAccountOverview()).rejects.toThrow("profile failed");
  });
});
