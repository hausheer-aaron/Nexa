import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TripManagePanel } from "@/components/trips/trip-manage-panel";
import { makeTrip } from "@/test/fixtures";

const refresh = vi.fn();
const replace = vi.fn();
const updateTripAction = vi.fn();
const deleteTripAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh,
    replace,
  }),
}));

vi.mock("@/app/trips/[tripId]/manage-actions", () => ({
  updateTripAction: (...args: unknown[]) => updateTripAction(...args),
  deleteTripAction: (...args: unknown[]) => deleteTripAction(...args),
}));

describe("TripManagePanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("confirm", vi.fn().mockReturnValue(true));
  });

  it("validates required fields before saving", () => {
    render(<TripManagePanel trip={makeTrip()} />);

    fireEvent.change(screen.getByLabelText("Titel"), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aenderungen speichern" }));

    expect(
      screen.getByText(/Titel, Startdatum und Enddatum sind erforderlich/i),
    ).toBeInTheDocument();
  });

  it("saves trip changes and refreshes the router", async () => {
    updateTripAction.mockResolvedValue({ error: null });
    const onSuccess = vi.fn();

    render(<TripManagePanel trip={makeTrip()} onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText("Titel"), {
      target: { value: "Updated Trip" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aenderungen speichern" }));

    await waitFor(() => expect(updateTripAction).toHaveBeenCalledTimes(1));
    expect(onSuccess).toHaveBeenCalled();
    expect(refresh).toHaveBeenCalled();
  });

  it("deletes the trip after confirmation", async () => {
    deleteTripAction.mockResolvedValue({ error: null });

    render(<TripManagePanel trip={makeTrip({ id: "trip-7" })} />);

    fireEvent.click(screen.getByRole("button", { name: "Trip loeschen" }));

    await waitFor(() => expect(deleteTripAction).toHaveBeenCalledWith("trip-7"));
    expect(replace).toHaveBeenCalledWith("/trips");
  });
});
