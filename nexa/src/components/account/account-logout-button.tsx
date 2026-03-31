"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AccountLogoutButton() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    setError(null);
    setIsPending(true);

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      setIsPending(false);
      return;
    }

    router.replace("/account");
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-white disabled:opacity-60"
      >
        {isPending ? "Logout..." : "Logout"}
      </button>

      {error ? (
        <p className="rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
