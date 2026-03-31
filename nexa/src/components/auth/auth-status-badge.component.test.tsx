import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthStatusBadge } from "@/components/auth/auth-status-badge";

const useSupabaseAuth = vi.fn();

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

vi.mock("@/components/providers/supabase-auth-provider", () => ({
  useSupabaseAuth: () => useSupabaseAuth(),
}));

describe("AuthStatusBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading label while auth is loading", () => {
    useSupabaseAuth.mockReturnValue({
      isLoading: true,
      user: null,
    });

    render(<AuthStatusBadge />);

    expect(screen.getByText("Verbindung...")).toBeInTheDocument();
  });

  it("shows the users email when logged in", () => {
    useSupabaseAuth.mockReturnValue({
      isLoading: false,
      user: { email: "user@example.com" },
    });

    render(<AuthStatusBadge />);

    expect(screen.getByRole("link", { name: "user@example.com" })).toHaveAttribute(
      "href",
      "/account",
    );
  });
});
