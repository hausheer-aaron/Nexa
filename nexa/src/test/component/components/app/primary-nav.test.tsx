import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrimaryNav } from "@/components/app/primary-nav";

const usePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("PrimaryNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the defined navigation items", () => {
    usePathname.mockReturnValue("/");

    render(<PrimaryNav />);

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Trips" })).toHaveAttribute(
      "href",
      "/trips",
    );
  });

  it("marks the current route as active", () => {
    usePathname.mockReturnValue("/places");

    render(<PrimaryNav />);

    expect(screen.getByRole("link", { name: "Orte" }).className).toContain(
      "bg-white/10",
    );
  });
});
