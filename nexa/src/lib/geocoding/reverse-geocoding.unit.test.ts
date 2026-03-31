import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getReverseGeocodingSuggestion,
  mapReverseGeocodingResult,
} from "@/lib/geocoding/reverse-geocoding";

describe("reverse geocoding helpers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps a nominatim payload into a suggestion", () => {
    expect(
      mapReverseGeocodingResult({
        display_name: "Bahnhofstrasse, Zurich, Switzerland",
        address: {
          road: "Bahnhofstrasse",
          country: "Switzerland",
          country_code: "ch",
          city: "Zurich",
        },
      }),
    ).toEqual({
      name: "Bahnhofstrasse",
      address: "Bahnhofstrasse, Zurich, Switzerland",
      countryName: "Switzerland",
      countryCode: "CH",
    });
  });

  it("returns null when a payload has no useful data", () => {
    expect(mapReverseGeocodingResult({})).toBeNull();
  });

  it("loads a reverse geocoding suggestion through the api route", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "Test Point",
        address: "Test Address",
        countryName: "Switzerland",
        countryCode: "CH",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getReverseGeocodingSuggestion(47.1, 8.3)).resolves.toEqual({
      name: "Test Point",
      address: "Test Address",
      countryName: "Switzerland",
      countryCode: "CH",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/reverse-geocode?lat=47.1&lon=8.3",
    );
  });

  it("returns null when the reverse geocoding request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(getReverseGeocodingSuggestion(47.1, 8.3)).resolves.toBeNull();
  });
});
