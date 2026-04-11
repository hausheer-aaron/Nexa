import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccountAuthPanel } from "@/components/auth/account-auth-panel";

const replace = vi.fn();
const refresh = vi.fn();
const signInWithPassword = vi.fn();
const signUp = vi.fn();
const signOut = vi.fn();
const from = vi.fn();
const useSupabaseAuth = vi.fn();
const getSearchParam = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace,
    refresh,
  }),
  useSearchParams: () => ({
    get: getSearchParam,
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      signInWithPassword,
      signUp,
      signOut,
    },
    from,
  }),
}));

vi.mock("@/components/providers/supabase-auth-provider", () => ({
  useSupabaseAuth: () => useSupabaseAuth(),
}));

describe("AccountAuthPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSearchParam.mockReturnValue("/map");
    useSupabaseAuth.mockReturnValue({
      isLoading: false,
      user: null,
    });
  });

  it("submits the login form and redirects to the next path", async () => {
    from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  email: "user@example.com",
                  created_at: "2026-01-01T00:00:00.000Z",
                },
                error: null,
              }),
            }),
          }),
        };
      }

      return {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            count: 0,
            error: null,
          }),
        }),
      };
    });

    signInWithPassword.mockResolvedValue({
      data: {
        user: { id: "user-1" },
        session: { access_token: "token" },
      },
      error: null,
    });

    render(<AccountAuthPanel />);

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Passwort"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Einloggen" }));

    await waitFor(() => expect(signInWithPassword).toHaveBeenCalledTimes(1));
    expect(replace).toHaveBeenCalledWith("/map");
    expect(refresh).toHaveBeenCalled();
  });

  it("shows signup feedback when no session is returned", async () => {
    signUp.mockResolvedValue({
      data: {
        user: { id: "user-1" },
        session: null,
      },
      error: null,
    });

    render(<AccountAuthPanel />);

    fireEvent.click(screen.getByRole("button", { name: "Signup" }));
    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Passwort"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Konto erstellen" }));

    await waitFor(() =>
      expect(
        screen.getByText(/Konto erstellt\. Falls E-Mail-Bestaetigung aktiv ist/i),
      ).toBeInTheDocument(),
    );
    expect(replace).not.toHaveBeenCalled();
  });

  it("renders the current session view for authenticated users", () => {
    useSupabaseAuth.mockReturnValue({
      isLoading: false,
      user: { id: "user-1", email: "user@example.com" },
    });

    render(<AccountAuthPanel />);

    expect(screen.getByText("Aktuelle Session")).toBeInTheDocument();
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Daten aktualisieren" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});
