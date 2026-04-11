import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccountLogoutButton } from "@/components/account/account-logout-button";

const replace = vi.fn();
const refresh = vi.fn();
const signOut = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace,
    refresh,
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      signOut,
    },
  }),
}));

describe("AccountLogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("signs the user out and redirects to account", async () => {
    signOut.mockResolvedValue({ error: null });

    render(<AccountLogoutButton />);

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
    expect(replace).toHaveBeenCalledWith("/account");
    expect(refresh).toHaveBeenCalled();
  });

  it("shows an error when sign out fails", async () => {
    signOut.mockResolvedValue({
      error: { message: "logout failed" },
    });

    render(<AccountLogoutButton />);

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() =>
      expect(screen.getByText("logout failed")).toBeInTheDocument(),
    );
  });
});
