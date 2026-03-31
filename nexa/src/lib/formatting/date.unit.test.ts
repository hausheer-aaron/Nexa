import { describe, expect, it } from "vitest";
import { formatCreatedAtDate, formatDateRange } from "@/lib/formatting/date";

describe("date formatting helpers", () => {
  it("formats a trip date range", () => {
    expect(formatDateRange("2026-03-01", "2026-03-12")).toBe(
      "2026-03-01 - 2026-03-12",
    );
  });

  it("formats a created_at value for de-CH", () => {
    expect(formatCreatedAtDate("2026-03-30T10:15:00.000Z")).toBe("30.03.2026");
  });
});
