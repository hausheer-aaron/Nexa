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
    <div className="space-y-6 md:space-y-8 xl:space-y-10">
      <section className="overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(248,243,235,0.9))] px-5 py-6 shadow-[0_28px_80px_rgba(32,24,16,0.08)] sm:px-6 md:px-8 md:py-8 xl:px-10 xl:py-9">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-accent">Account</p>
            <span className="rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-xs font-medium text-muted">
              Zugang und Profil
            </span>
          </div>
          <h1 className="max-w-4xl text-[2.45rem] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl xl:text-[4.4rem] xl:leading-[1.02]">
            Dein Profil,
            <span className="block text-foreground/72">
              mit Zugang, Datenstand und Session im Blick.
            </span>
          </h1>
          <p className="max-w-3xl text-[0.98rem] leading-7 text-muted md:text-lg">
            Melde dich an, um auf Trips, Places, Timeline und Kartenansicht
            zuzugreifen. Nach dem Login dient diese Seite als ruhige
            Account-Uebersicht.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="rounded-[1.9rem] border border-black/8 bg-white/82 p-6 text-sm text-muted shadow-[0_14px_36px_rgba(32,24,16,0.04)]">
            Lade Authentifizierung...
          </div>
        }
      >
        <AccountAuthPanel />
      </Suspense>
    </div>
  );
}
