import { afterEach, describe, expect, it } from "vitest";
import { getSupabaseConfig } from "@/lib/supabase/config";

describe("supabase config", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  it("returns the required config when env vars are set", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    expect(getSupabaseConfig()).toEqual({
      url: "https://example.supabase.co",
      anonKey: "anon-key",
    });
  });

  it("throws when env vars are missing", () => {
    expect(() => getSupabaseConfig()).toThrow(
      "Missing Supabase environment variables.",
    );
  });
});
