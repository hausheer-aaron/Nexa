import type { ReactNode } from "react";
import Link from "next/link";
import { AuthStatusBadge } from "@/components/auth/auth-status-badge";
import { PrimaryNav } from "@/components/app/primary-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="page-shell min-h-screen">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#1f2421] text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
        <div className="flex min-h-16 w-full items-center gap-6 px-4 md:px-6 xl:px-10">
          <Link href="/" className="flex items-center gap-3 pr-2">
            <span className="text-xl font-semibold tracking-tight">Nexa</span>
            <span className="hidden text-xs uppercase tracking-[0.24em] text-white/45 md:inline">
              Travel Journal
            </span>
          </Link>

          <div className="min-w-0 flex-1">
            <PrimaryNav />
          </div>

          <AuthStatusBadge />
        </div>
      </header>

      <main className="w-full px-4 py-5 md:px-6 md:py-6 xl:px-10">
        <div className="glass-panel min-h-[calc(100vh-7rem)] rounded-[1.75rem] p-5 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
