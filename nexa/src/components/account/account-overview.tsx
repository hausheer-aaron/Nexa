import { AccountLogoutButton } from "@/components/account/account-logout-button";
import type { AccountOverview as AccountOverviewData } from "@/services/accountService";

type AccountOverviewProps = {
  overview: AccountOverviewData;
};

function formatDate(value: string | null) {
  if (!value) {
    return "Nicht verfuegbar";
  }

  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function AccountOverview({ overview }: AccountOverviewProps) {
  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Account</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Deine Account Uebersicht
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Basisdaten aus deinem Profil sowie eine kompakte Uebersicht deiner
          gespeicherten Reisen und Orte.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-muted">Profil</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Basisdaten
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-surface-strong p-4 md:col-span-2">
              <p className="text-sm text-muted">E-Mail</p>
              <p className="mt-2 text-lg font-semibold">
                {overview.email ?? "Nicht verfuegbar"}
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-surface-strong p-4 md:col-span-2">
              <p className="text-sm text-muted">Registriert seit</p>
              <p className="mt-2 text-lg font-semibold">
                {formatDate(overview.registeredAt)}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-border bg-[#f6dfd0] p-6">
          <p className="eyebrow text-accent-warm">Uebersicht</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Dein Datenstand
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/55 p-4">
              <p className="text-sm text-foreground/70">Trips</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">
                {overview.tripCount}
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white/55 p-4">
              <p className="text-sm text-foreground/70">Places</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">
                {overview.placeCount}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-white/55 p-4">
            <p className="text-sm text-foreground/70">Session</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Du bist aktuell eingeloggt und kannst deine Daten ueber mehrere
              Geraete hinweg synchron nutzen.
            </p>
          </div>

          <div className="mt-6">
            <AccountLogoutButton />
          </div>
        </article>
      </section>
    </div>
  );
}
