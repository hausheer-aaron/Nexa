import { Suspense } from "react";
import { AccountOverview } from "@/components/account/account-overview";
import { AccountAuthPanel } from "@/components/auth/account-auth-panel";
import { getCurrentAccountOverview } from "@/services/accountService";

export default async function AccountPage() {
  const overview = await getCurrentAccountOverview();

  if (overview) {
    return <AccountOverview overview={overview} />;
  }

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Account</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Login und Zugriff auf deine Daten
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Melde dich an, um auf Trips, Places, Timeline und Kartenansicht
          zuzugreifen. Nach dem Login dient diese Seite als einfache
          Account-Uebersicht.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="rounded-[1.75rem] border border-border bg-white/62 p-6 text-sm text-muted">
            Lade Authentifizierung...
          </div>
        }
      >
        <AccountAuthPanel />
      </Suspense>
    </div>
  );
}
