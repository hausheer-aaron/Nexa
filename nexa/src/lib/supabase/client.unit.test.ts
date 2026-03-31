import { beforeEach, describe, expect, it, vi } from "vitest";

const { createBrowserClient } = vi.hoisted(() => ({
  createBrowserClient: vi.fn(),
}));

const { getSupabaseConfig } = vi.hoisted(() => ({
  getSupabaseConfig: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createBrowserClient,
}));

vi.mock("@/lib/supabase/config", () => ({
  getSupabaseConfig,
}));

describe("supabase browser client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("creates the client from the configured supabase values", async () => {
    const client = { auth: {} };
    getSupabaseConfig.mockReturnValue({
      url: "https://example.supabase.co",
      anonKey: "anon-key",
    });
    createBrowserClient.mockReturnValue(client);

    const { getSupabaseBrowserClient } = await import("@/lib/supabase/client");

    expect(getSupabaseBrowserClient()).toBe(client);
    expect(createBrowserClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-key",
    );
  });

  it("reuses the same client instance across calls", async () => {
    const client = { auth: {} };
    getSupabaseConfig.mockReturnValue({
      url: "https://example.supabase.co",
      anonKey: "anon-key",
    });
    createBrowserClient.mockReturnValue(client);

    const { getSupabaseBrowserClient } = await import("@/lib/supabase/client");

    expect(getSupabaseBrowserClient()).toBe(client);
    expect(getSupabaseBrowserClient()).toBe(client);
    expect(createBrowserClient).toHaveBeenCalledTimes(1);
  });
});
