import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AccountOverview } from "@/components/account/account-overview";

vi.mock("@/components/account/account-logout-button", () => ({
  AccountLogoutButton: () => <button type="button">Logout Mock</button>,
}));

describe("AccountOverview", () => {
  it("renders account details and counts", () => {
    render(
      <AccountOverview
        overview={{
          email: "user@example.com",
          registeredAt: "2026-01-15T00:00:00.000Z",
          tripCount: 4,
          placeCount: 9,
        }}
      />,
    );

    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout Mock" })).toBeInTheDocument();
  });

  it("shows fallback labels when account data is missing", () => {
    render(
      <AccountOverview
        overview={{
          email: null,
          registeredAt: null,
          tripCount: 0,
          placeCount: 0,
        }}
      />,
    );

    expect(screen.getAllByText("Nicht verfuegbar")).toHaveLength(2);
  });
});
