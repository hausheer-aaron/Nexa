"use client";

import Link from "next/link";
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider";

export function AuthStatusBadge() {
  const { isLoading, user } = useSupabaseAuth();

  const label = isLoading
    ? "Verbindung..."
    : user?.email
      ? user.email
      : "Nicht eingeloggt";

  return (
    <Link
      href="/account"
      className="hidden min-w-fit rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/78 transition-colors hover:bg-white/12 md:inline-flex"
    >
      {label}
    </Link>
  );
}
