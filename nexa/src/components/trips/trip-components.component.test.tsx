import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TripDetailCard } from "@/components/trips/trip-detail-card";
import { TripPlacesList } from "@/components/trips/trip-places-list";
import { makePlace, makeTrip } from "@/test/fixtures";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("trip detail components", () => {
  it("renders trip detail data", () => {
    render(<TripDetailCard trip={makeTrip({ title: "Road Trip" })} />);

    expect(screen.getByText("Road Trip")).toBeInTheDocument();
    expect(screen.getByText("Zurich")).toBeInTheDocument();
    expect(screen.getByText("Switzerland")).toBeInTheDocument();
  });

  it("renders assigned places and the empty state", () => {
    const { rerender } = render(<TripPlacesList places={[]} />);

    expect(
      screen.getByText(/aktuell noch keine Places zugeordnet/i),
    ).toBeInTheDocument();

    rerender(<TripPlacesList places={[makePlace({ name: "Lookout" })]} />);

    expect(screen.getByRole("link", { name: /Lookout/i })).toHaveAttribute(
      "href",
      "/places/place-1",
    );
  });
});
