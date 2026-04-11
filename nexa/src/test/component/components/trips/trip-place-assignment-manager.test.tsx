import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TripPlaceAssignmentManager } from "@/components/trips/trip-place-assignment-manager";
import { makePlace } from "@/test/fixtures";

const refresh = vi.fn();
const assignPlaceToTripFromTripAction = vi.fn();
const removePlaceFromTripAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh,
  }),
}));

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

vi.mock("@/app/trips/[tripId]/place-actions", () => ({
  assignPlaceToTripFromTripAction: (...args: unknown[]) =>
    assignPlaceToTripFromTripAction(...args),
  removePlaceFromTripAction: (...args: unknown[]) =>
    removePlaceFromTripAction(...args),
}));

describe("TripPlaceAssignmentManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the empty assigned state and disables submit when no places are available", () => {
    render(
      <TripPlaceAssignmentManager
        tripId="trip-1"
        assignedPlaces={[makePlace()]}
        allPlaces={[makePlace()]}
      />,
    );

    expect(
      screen.queryByText(/Diesem Trip sind aktuell noch keine Places zugeordnet/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Place hinzufuegen" }),
    ).toBeDisabled();
  });

  it("assigns an available place to the trip", async () => {
    assignPlaceToTripFromTripAction.mockResolvedValue({ error: null });

    render(
      <TripPlaceAssignmentManager
        tripId="trip-1"
        assignedPlaces={[makePlace({ id: "place-1" })]}
        allPlaces={[
          makePlace({ id: "place-1" }),
          makePlace({ id: "place-2", name: "Second Place" }),
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Place hinzufuegen" }));

    await waitFor(() =>
      expect(assignPlaceToTripFromTripAction).toHaveBeenCalledWith({
        tripId: "trip-1",
        placeId: "place-2",
      }),
    );
    expect(refresh).toHaveBeenCalled();
  });

  it("removes an assigned place from the trip", async () => {
    removePlaceFromTripAction.mockResolvedValue({ error: null });

    render(
      <TripPlaceAssignmentManager
        tripId="trip-1"
        assignedPlaces={[makePlace({ id: "place-1", name: "Assigned Place" })]}
        allPlaces={[makePlace({ id: "place-1", name: "Assigned Place" })]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Aus Trip entfernen" }));

    await waitFor(() =>
      expect(removePlaceFromTripAction).toHaveBeenCalledWith({
        tripId: "trip-1",
        placeId: "place-1",
      }),
    );
    expect(refresh).toHaveBeenCalled();
  });
});
