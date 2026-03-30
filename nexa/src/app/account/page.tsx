import { Suspense } from "react";
import { AccountAuthPanel } from "@/components/auth/account-auth-panel";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Account</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Login, Sync und spaetere Einstellungen
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Hier laeuft jetzt die echte Supabase-Authentifizierung mit
          Session-Persistenz im Browser und einem ersten Zugriff auf deine
          Benutzer-Daten. Alle anderen Seiten sind fuer nicht eingeloggte
          Nutzer gesperrt.
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
