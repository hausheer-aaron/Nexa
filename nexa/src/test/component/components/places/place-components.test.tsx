import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlaceDetailCard } from "@/components/places/place-detail-card";
import { PlaceTripList } from "@/components/places/place-trip-list";
import { makePlace, makeTrip } from "@/test/fixtures";

describe("place detail components", () => {
  it("renders place detail data", () => {
    render(<PlaceDetailCard place={makePlace({ name: "Lake View" })} />);

    expect(screen.getByText("Lake View")).toBeInTheDocument();
    expect(screen.getByText("Test Street 1")).toBeInTheDocument();
    expect(screen.getByText("47.3769")).toBeInTheDocument();
  });

  it("renders assigned trip badges and the empty state", () => {
    const { rerender } = render(<PlaceTripList trips={[]} />);

    expect(
      screen.getByText(/aktuell noch keinem Trip zugeordnet/i),
    ).toBeInTheDocument();

    rerender(<PlaceTripList trips={[makeTrip({ title: "Spring Escape" })]} />);

    expect(screen.getByText("Spring Escape")).toBeInTheDocument();
  });
});
