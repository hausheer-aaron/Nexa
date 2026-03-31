import { describe, expect, it } from "vitest";
import {
  buildPlacePopupHtml,
  buildSelectedPointPopupHtml,
  createMarkerElement,
  hasValidCoordinates,
} from "@/lib/map/maplibre-utils";
import { makePlace } from "@/test/fixtures";

describe("maplibre utils", () => {
  it("checks whether a place has valid coordinates", () => {
    expect(hasValidCoordinates(makePlace())).toBe(true);
    expect(
      hasValidCoordinates(makePlace({ latitude: Number.NaN })),
    ).toBe(false);
  });

  it("creates marker elements for place and selected markers", () => {
    const placeMarker = createMarkerElement("place");
    const selectedMarker = createMarkerElement("selected");

    expect(placeMarker.getAttribute("aria-label")).toBe("Place marker");
    expect(placeMarker.className).toContain("map-marker--place");
    expect(selectedMarker.getAttribute("aria-label")).toBe("Selected point");
    expect(selectedMarker.className).toContain("map-marker--selected");
  });

  it("builds popup content for places", () => {
    const popup = buildPlacePopupHtml(makePlace({ name: "Lake View" }), 2);

    expect(popup.textContent).toContain("Stop 2");
    expect(popup.textContent).toContain("Lake View");
    expect(popup.textContent).toContain("Test Street 1");
  });

  it("builds popup content for selected points", () => {
    const popup = buildSelectedPointPopupHtml(47.3769, 8.5417);

    expect(popup.textContent).toContain("Ausgewaehlter Punkt");
    expect(popup.textContent).toContain("47.376900, 8.541700");
  });
});
