import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateTripForm } from "@/components/trips/create-trip-form";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh,
  }),
}));

describe("CreateTripForm", () => {
  beforeEach(() => {
    refresh.mockReset();
  });

  it("renders the expected inputs", () => {
    render(<CreateTripForm action={vi.fn()} />);

    expect(screen.getByLabelText("Titel")).toBeInTheDocument();
    expect(screen.getByLabelText("Region")).toBeInTheDocument();
    expect(screen.getByLabelText("Land")).toBeInTheDocument();
    expect(screen.getByLabelText("Start")).toBeInTheDocument();
    expect(screen.getByLabelText("Ende")).toBeInTheDocument();
  });

  it("submits the filled form", async () => {
    const action = vi.fn().mockResolvedValue({ success: true });
    render(<CreateTripForm action={action} />);

    fireEvent.change(screen.getByLabelText("Titel"), {
      target: { value: "Spring in Lisbon" },
    });
    fireEvent.change(screen.getByLabelText("Region"), {
      target: { value: "Lisbon" },
    });
    fireEvent.change(screen.getByLabelText("Land"), {
      target: { value: "Portugal" },
    });
    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "2026-04-01" },
    });
    fireEvent.change(screen.getByLabelText("Ende"), {
      target: { value: "2026-04-07" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Trip speichern" }));

    await waitFor(() => expect(action).toHaveBeenCalledTimes(1));

    const formData = action.mock.calls[0][0] as FormData;
    expect(formData.get("title")).toBe("Spring in Lisbon");
    expect(formData.get("region")).toBe("Lisbon");
    expect(formData.get("country")).toBe("Portugal");
    expect(formData.get("start_date")).toBe("2026-04-01");
    expect(formData.get("end_date")).toBe("2026-04-07");
    expect(refresh).toHaveBeenCalled();
  });
});
