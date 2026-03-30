"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider";

type Mode = "signin" | "signup";

type AccountSnapshot = {
  profileEmail: string | null;
  profileCreatedAt: string | null;
  tripsCount: number;
  placesCount: number;
};

const defaultSnapshot: AccountSnapshot = {
  profileEmail: null,
  profileCreatedAt: null,
  tripsCount: 0,
  placesCount: 0,
};

export function AccountAuthPanel() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, user } = useSupabaseAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [snapshot, setSnapshot] = useState<AccountSnapshot>(defaultSnapshot);
  const visibleSnapshot = user ? snapshot : defaultSnapshot;

  const loadSnapshot = useCallback(async (userId: string) => {
    setIsRefreshing(true);
    setError(null);

    const [profileResult, tripsResult, placesResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("email, created_at")
        .eq("id", userId)
        .single(),
      supabase
        .from("trips")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("places")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
    ]);

    if (profileResult.error) {
      setError(profileResult.error.message);
      setIsRefreshing(false);
      return;
    }

    if (tripsResult.error) {
      setError(tripsResult.error.message);
      setIsRefreshing(false);
      return;
    }

    if (placesResult.error) {
      setError(placesResult.error.message);
      setIsRefreshing(false);
      return;
    }

    setSnapshot({
      profileEmail: profileResult.data.email,
      profileCreatedAt: profileResult.data.created_at,
      tripsCount: tripsResult.count ?? 0,
      placesCount: placesResult.count ?? 0,
    });
    setIsRefreshing(false);
  }, [supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    const action =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { data, error: authError } = await action;

    if (authError) {
      setError(authError.message);
      setIsSubmitting(false);
      return;
    }

    if (mode === "signup" && !data.session) {
      setFeedback(
        "Konto erstellt. Falls E-Mail-Bestaetigung aktiv ist, bestaetige zuerst deine Adresse.",
      );
      setIsSubmitting(false);
      return;
    }

    setFeedback(
      mode === "signin"
        ? "Login erfolgreich."
        : "Konto erstellt und direkt eingeloggt.",
    );

    if (data.user?.id) {
      await loadSnapshot(data.user.id);
    }

    setPassword("");
    setIsSubmitting(false);
    const nextPath = searchParams.get("next") || "/";
    router.replace(nextPath);
    router.refresh();
  }

  async function handleLogout() {
    setError(null);
    setFeedback(null);
    setIsSubmitting(true);

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      setIsSubmitting(false);
      return;
    }

    setSnapshot(defaultSnapshot);
    setFeedback("Du wurdest ausgeloggt.");
    setIsSubmitting(false);
    router.replace("/account");
    router.refresh();
  }

  async function handleRefresh() {
    if (!user?.id) {
      return;
    }

    await loadSnapshot(user.id);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-muted">Supabase Auth</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {user ? "Eingeloggt" : "Login oder Registrierung"}
            </h2>
          </div>

          <div className="flex rounded-full border border-border bg-surface-strong p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                mode === "signin" ? "bg-accent text-white" : "text-muted"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                mode === "signup" ? "bg-accent text-white" : "text-muted"
              }`}
            >
              Signup
            </button>
          </div>
        </div>

        {user ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.5rem] bg-surface-strong p-4">
              <p className="text-sm text-muted">Aktuelle Session</p>
              <p className="mt-2 text-lg font-semibold">{user.email}</p>
              <p className="mt-2 text-sm text-muted">User ID: {user.id}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isRefreshing ? "Lade Daten..." : "Daten aktualisieren"}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isSubmitting}
                className="rounded-full border border-border px-4 py-3 text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">E-Mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Passwort</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
                placeholder="Mindestens 6 Zeichen"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting
                ? "Sende..."
                : mode === "signin"
                  ? "Einloggen"
                  : "Konto erstellen"}
            </button>
          </form>
        )}

        {feedback ? (
          <p className="mt-4 rounded-[1rem] bg-accent-soft px-4 py-3 text-sm text-accent">
            {feedback}
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
            {error}
          </p>
        ) : null}
      </article>

      <article className="rounded-[1.75rem] border border-border bg-[#f6dfd0] p-6">
        <p className="eyebrow text-accent-warm">Database Snapshot</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.5rem] bg-white/55 p-4">
            <p className="text-sm text-foreground/70">Profile</p>
            <p className="mt-2 text-lg font-semibold">
              {visibleSnapshot.profileEmail ?? "Noch nicht geladen"}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/55 p-4">
            <p className="text-sm text-foreground/70">Erstellt</p>
            <p className="mt-2 text-lg font-semibold">
              {visibleSnapshot.profileCreatedAt
                ? new Date(visibleSnapshot.profileCreatedAt).toLocaleDateString(
                    "de-CH",
                  )
                : "-"}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/55 p-4">
            <p className="text-sm text-foreground/70">Trips</p>
            <p className="mt-2 text-3xl font-semibold">
              {visibleSnapshot.tripsCount}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/55 p-4">
            <p className="text-sm text-foreground/70">Places</p>
            <p className="mt-2 text-3xl font-semibold">
              {visibleSnapshot.placesCount}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-white/50 p-4 text-sm leading-6 text-foreground/80">
          <p>
            Nach dem Login kannst du direkt pruefen, ob `profiles`, `trips` und
            `places` ueber deine RLS-Regeln korrekt nur fuer den aktuellen User
            geliefert werden.
          </p>
        </div>
      </article>
    </section>
  );
}
