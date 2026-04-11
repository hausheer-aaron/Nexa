import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { RecentPlacesCard } from "@/components/dashboard/recent-places-card";
import { RecentTripsCard } from "@/components/dashboard/recent-trips-card";
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

describe("dashboard components", () => {
  it("renders a stat card", () => {
    render(
      <DashboardStatCard
        label="Trips"
        value={3}
        detail="Aktive Reisen im Profil"
      />,
    );

    expect(screen.getByText("Trips")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Aktive Reisen im Profil")).toBeInTheDocument();
  });

  it("shows empty states in recent cards", () => {
    render(
      <div>
        <RecentTripsCard trips={[]} />
        <RecentPlacesCard places={[]} />
      </div>,
    );

    expect(screen.getByText(/Noch keine Trips vorhanden/i)).toBeInTheDocument();
    expect(screen.getByText(/Noch keine Places vorhanden/i)).toBeInTheDocument();
  });

  it("renders recent trip and place entries", () => {
    render(
      <div>
        <RecentTripsCard trips={[makeTrip({ title: "Spring Trip" })]} />
        <RecentPlacesCard places={[makePlace({ name: "Lake View" })]} />
      </div>,
    );

    expect(screen.getByRole("link", { name: /Spring Trip/i })).toHaveAttribute(
      "href",
      "/trips/trip-1",
    );
    expect(screen.getByRole("link", { name: /Lake View/i })).toHaveAttribute(
      "href",
      "/places/place-1",
    );
  });
});
