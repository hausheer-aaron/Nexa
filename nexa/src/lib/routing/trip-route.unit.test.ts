import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getStraightLineRouteCoordinates,
  getStreetRouteCoordinates,
} from "@/lib/routing/trip-route";
import { makePlace } from "@/test/fixtures";

describe("trip route helpers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps places to straight line coordinates", () => {
    expect(
      getStraightLineRouteCoordinates([
        makePlace({ longitude: 8.5, latitude: 47.3 }),
        makePlace({ id: "place-2", longitude: 9.1, latitude: 46.8 }),
      ]),
    ).toEqual([
      [8.5, 47.3],
      [9.1, 46.8],
    ]);
  });

  it("returns the straight line when fewer than two points exist", async () => {
    await expect(
      getStreetRouteCoordinates([makePlace({ longitude: 8.5, latitude: 47.3 })]),
    ).resolves.toEqual([[8.5, 47.3]]);
  });

  it("loads street route coordinates via the api route", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        code: "Ok",
        routes: [
          {
            geometry: {
              coordinates: [
                [8.5, 47.3],
                [9.1, 46.8],
              ],
            },
          },
        ],
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      getStreetRouteCoordinates([
        makePlace({ longitude: 8.5, latitude: 47.3 }),
        makePlace({ id: "place-2", longitude: 9.1, latitude: 46.8 }),
      ]),
    ).resolves.toEqual([
      [8.5, 47.3],
      [9.1, 46.8],
    ]);

    expect(fetchMock).toHaveBeenCalled();
  });

  it("returns null when the routing endpoint fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(
      getStreetRouteCoordinates([
        makePlace(),
        makePlace({ id: "place-2", longitude: 9.1, latitude: 46.8 }),
      ]),
    ).resolves.toBeNull();
  });
});
