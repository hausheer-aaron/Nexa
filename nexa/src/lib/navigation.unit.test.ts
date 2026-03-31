import { describe, expect, it } from "vitest";
import { navigationItems } from "@/lib/navigation";

describe("navigation items", () => {
  it("contains the primary app routes", () => {
    expect(navigationItems.map((item) => item.href)).toEqual([
      "/",
      "/map",
      "/trips",
      "/places",
      "/timeline",
      "/account",
    ]);
  });

  it("has labels for each navigation item", () => {
    expect(navigationItems.every((item) => item.label.length > 0)).toBe(true);
  });
});
