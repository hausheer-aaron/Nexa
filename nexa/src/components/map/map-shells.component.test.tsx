import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MapLibreMap } from "@/components/map/maplibre-map";
import { PlacesMapShell } from "@/components/map/places-map-shell";
import { TripRouteMapShell } from "@/components/trips/trip-route-map-shell";
import { makePlace } from "@/test/fixtures";

const createPlaceFromMapForm = vi.fn();

vi.mock("next/dynamic", () => ({
  default: () => {
    return function MockDynamicComponent(props: {
      onSelectPoint?: (point: { latitude: number; longitude: number }) => void;
      places?: unknown[];
    }) {
      return (
        <div>
          <p>Mock Map Component</p>
          <p>Places: {props.places?.length ?? 0}</p>
          {props.onSelectPoint ? (
            <button
              type="button"
              onClick={() =>
                props.onSelectPoint?.({ latitude: 47.1, longitude: 8.3 })
              }
            >
              Punkt waehlen
            </button>
          ) : null}
        </div>
      );
    };
  },
}));

vi.mock("@/components/map/create-place-from-map-form", () => ({
  CreatePlaceFromMapForm: (props: unknown) => {
    createPlaceFromMapForm(props);
    return <div>Mock Create Place Form</div>;
  },
}));

vi.mock("@/lib/map/maptiler", () => ({
  getMapTilerStyleUrl: () => null,
}));

describe("map related components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the maptiler key fallback in the map component", () => {
    render(
      <MapLibreMap
        initialCenter={[8.5, 47.3]}
        initialZoom={8}
      />,
    );

    expect(
      screen.getByText(/NEXT_PUBLIC_MAPTILER_KEY fehlt/i),
    ).toBeInTheDocument();
  });

  it("renders the places map shell and updates the selected point summary", () => {
    render(<PlacesMapShell places={[makePlace()]} />);

    expect(screen.getByText("Mock Map Component")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Punkt waehlen" }));

    expect(screen.getByText("47.100000, 8.300000")).toBeInTheDocument();
    expect(createPlaceFromMapForm).toHaveBeenCalled();
  });

  it("renders the trip route map shell", () => {
    render(<TripRouteMapShell places={[makePlace(), makePlace({ id: "place-2" })]} />);

    expect(screen.getByText("Mock Map Component")).toBeInTheDocument();
    expect(screen.getByText("Places: 2")).toBeInTheDocument();
  });
});
