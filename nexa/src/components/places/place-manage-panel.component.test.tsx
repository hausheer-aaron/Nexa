import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlaceManagePanel } from "@/components/places/place-manage-panel";
import { makePlace } from "@/test/fixtures";

const refresh = vi.fn();
const replace = vi.fn();
const updatePlaceAction = vi.fn();
const deletePlaceAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh,
    replace,
  }),
}));

vi.mock("@/app/places/[placeId]/manage-actions", () => ({
  updatePlaceAction: (...args: unknown[]) => updatePlaceAction(...args),
  deletePlaceAction: (...args: unknown[]) => deletePlaceAction(...args),
}));

describe("PlaceManagePanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("confirm", vi.fn().mockReturnValue(true));
  });

  it("validates the place name before saving", () => {
    render(<PlaceManagePanel place={makePlace()} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aenderungen speichern" }));

    expect(screen.getByText(/Name ist erforderlich/i)).toBeInTheDocument();
  });

  it("saves place changes and refreshes the router", async () => {
    updatePlaceAction.mockResolvedValue({ error: null });
    const onSuccess = vi.fn();

    render(<PlaceManagePanel place={makePlace()} onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated Place" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aenderungen speichern" }));

    await waitFor(() => expect(updatePlaceAction).toHaveBeenCalledTimes(1));
    expect(onSuccess).toHaveBeenCalled();
    expect(refresh).toHaveBeenCalled();
  });

  it("deletes the place after confirmation", async () => {
    deletePlaceAction.mockResolvedValue({ error: null });

    render(<PlaceManagePanel place={makePlace({ id: "place-7" })} />);

    fireEvent.click(screen.getByRole("button", { name: "Place loeschen" }));

    await waitFor(() =>
      expect(deletePlaceAction).toHaveBeenCalledWith("place-7"),
    );
    expect(replace).toHaveBeenCalledWith("/places");
  });
});
