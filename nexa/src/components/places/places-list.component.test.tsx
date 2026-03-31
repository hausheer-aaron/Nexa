import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlacesList } from "@/components/places/places-list";
import type { Place } from "@/types/entities";

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

describe("PlacesList", () => {
  it("shows an empty state when no places exist", () => {
    render(<PlacesList places={[]} />);

    expect(
      screen.getByText(/Noch keine Places vorhanden/i),
    ).toBeInTheDocument();
  });

  it("renders place entries", () => {
    const places: Place[] = [
      {
        id: "place-1",
        user_id: "user-1",
        name: "Lake View",
        address: "Zurich Lake",
        latitude: 47.3769,
        longitude: 8.5417,
        note: "Morning walk",
        country_code: "CH",
        country_name: "Switzerland",
        created_at: "2026-03-01T10:00:00.000Z",
      },
    ];

    render(<PlacesList places={places} />);

    expect(screen.getByText("Lake View")).toBeInTheDocument();
    expect(screen.getByText("Zurich Lake")).toBeInTheDocument();
    expect(
      screen.getByText("47.3769, 8.5417"),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lake View/i })).toHaveAttribute(
      "href",
      "/places/place-1",
    );
  });
});
