import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimelineList } from "@/components/timeline/timeline-list";
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

describe("TimelineList", () => {
  it("renders an empty state when no groups exist", () => {
    render(<TimelineList groups={[]} />);

    expect(screen.getByText(/Your journal starts here/i)).toBeInTheDocument();
  });

  it("renders grouped timeline entries with trip badges", () => {
    render(
      <TimelineList
        groups={[
          {
            dateLabel: "2026-03-01",
            entries: [
              {
                place: makePlace({ id: "place-9", name: "City Walk" }),
                trips: [makeTrip({ id: "trip-9", title: "Weekend Trip" })],
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /City Walk/i })).toHaveAttribute(
      "href",
      "/places/place-9",
    );
    expect(screen.getByText("Weekend Trip")).toBeInTheDocument();
  });
});
