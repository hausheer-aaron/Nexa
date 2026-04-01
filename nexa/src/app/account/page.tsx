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
    <div className="space-y-8 xl:space-y-10">
      <section className="rounded-[2rem] border border-border bg-white px-6 py-7 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:px-8 md:py-8">
        <p className="eyebrow text-accent">Account</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Your profile
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Melde dich an, um auf Trips, Places, Timeline und Kartenansicht
          zuzugreifen. Nach dem Login dient diese Seite als einfache
          Account-Uebersicht.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="rounded-[1.9rem] border border-border bg-white p-6 text-sm text-muted shadow-[0_14px_36px_rgba(32,24,16,0.04)]">
            Lade Authentifizierung...
          </div>
        }
      >
        <AccountAuthPanel />
      </Suspense>
    </div>
  );
}
