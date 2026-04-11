import { afterEach, describe, expect, it } from "vitest";
import { getMapTilerStyleUrl } from "@/lib/map/maptiler";

describe("maptiler config helper", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_MAPTILER_KEY;
  });

  it("returns null without a key", () => {
    delete process.env.NEXT_PUBLIC_MAPTILER_KEY;
    expect(getMapTilerStyleUrl()).toBeNull();
  });

  it("returns a style url with the configured key", () => {
    process.env.NEXT_PUBLIC_MAPTILER_KEY = "abc123";
    expect(getMapTilerStyleUrl()).toContain("abc123");
    expect(getMapTilerStyleUrl()).toContain("style.json");
  });
});
