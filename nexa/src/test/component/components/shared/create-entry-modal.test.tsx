import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CreateEntryModal } from "@/components/shared/create-entry-modal";

describe("CreateEntryModal", () => {
  it("opens and closes the dialog", () => {
    render(
      <CreateEntryModal
        buttonLabel="Neuen Trip erstellen"
        eyebrow="Neuer Trip"
        title="Trip anlegen"
        description="Dialog Test"
      >
        {({ closeModal }) => (
          <div>
            <p>Dialoginhalt</p>
            <button type="button" onClick={closeModal}>
              Innen schliessen
            </button>
          </div>
        )}
      </CreateEntryModal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Neuen Trip erstellen" }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialoginhalt")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Schliessen" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
