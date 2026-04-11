import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreatePlaceForm } from "@/components/places/create-place-form";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh,
  }),
}));

describe("CreatePlaceForm", () => {
  beforeEach(() => {
    refresh.mockReset();
  });

  it("renders the expected inputs", () => {
    render(<CreatePlaceForm action={vi.fn()} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse")).toBeInTheDocument();
    expect(screen.getByLabelText("Latitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Longitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Notiz")).toBeInTheDocument();
  });

  it("submits the filled form", async () => {
    const action = vi.fn().mockResolvedValue({ success: true });
    render(<CreatePlaceForm action={action} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Seaside View" },
    });
    fireEvent.change(screen.getByLabelText("Adresse"), {
      target: { value: "Harbor Road" },
    });
    fireEvent.change(screen.getByLabelText("Latitude"), {
      target: { value: "47.3769" },
    });
    fireEvent.change(screen.getByLabelText("Longitude"), {
      target: { value: "8.5417" },
    });
    fireEvent.change(screen.getByLabelText("Notiz"), {
      target: { value: "Best at sunset" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place speichern" }));

    await waitFor(() => expect(action).toHaveBeenCalledTimes(1));

    const formData = action.mock.calls[0][0] as FormData;
    expect(formData.get("name")).toBe("Seaside View");
    expect(formData.get("address")).toBe("Harbor Road");
    expect(formData.get("latitude")).toBe("47.3769");
    expect(formData.get("longitude")).toBe("8.5417");
    expect(formData.get("note")).toBe("Best at sunset");
    expect(refresh).toHaveBeenCalled();
  });
});
