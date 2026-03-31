import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TripsList } from "@/components/trips/trips-list";
import type { Trip } from "@/types/entities";

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

describe("TripsList", () => {
  it("shows an empty state when no trips exist", () => {
    render(<TripsList trips={[]} />);

    expect(
      screen.getByText(/Noch keine Trips vorhanden/i),
    ).toBeInTheDocument();
  });

  it("renders trip entries", () => {
    const trips: Trip[] = [
      {
        id: "trip-1",
        user_id: "user-1",
        title: "Alps Escape",
        region: "Graubuenden",
        country: "Switzerland",
        start_date: "2026-06-01",
        end_date: "2026-06-07",
        created_at: "2026-03-01T10:00:00.000Z",
      },
    ];

    render(<TripsList trips={trips} />);

    expect(screen.getByText("Alps Escape")).toBeInTheDocument();
    expect(screen.getByText("2026-06-01 - 2026-06-07")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Alps Escape/i })).toHaveAttribute(
      "href",
      "/trips/trip-1",
    );
  });
});
