import Link from "next/link";

const quickActions = [
  {
    href: "/trips",
    title: "Neuen Trip erstellen",
    description: "Starte eine neue Reise und halte Zeitraum, Region und Land fest.",
    accentClass: "bg-[#f6dfd0] text-[#7a4122]",
  },
  {
    href: "/places",
    title: "Neuen Ort speichern",
    description: "Lege einen neuen Place mit Notiz und Koordinaten an.",
    accentClass: "bg-[#dfeae4] text-[#1d5d4a]",
  },
  {
    href: "/map",
    title: "Karte oeffnen",
    description: "Springe direkt in die Kartenansicht und arbeite mit deinen Pins.",
    accentClass: "bg-[#e7e2f4] text-[#50428a]",
  },
] as const;

export function DashboardQuickActions() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-muted">Quick Actions</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Direkt weitermachen
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted">
          Die wichtigsten Einstiege fuer neue Daten und den direkten Wechsel in
          die Karte.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group rounded-[1.75rem] border border-border bg-white p-5 shadow-[0_14px_36px_rgba(32,24,16,0.05)] transition hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-[0_18px_44px_rgba(32,24,16,0.1)]"
          >
            <span
              className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${action.accentClass}`}
            >
              Aktion
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
              {action.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {action.description}
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-accent transition group-hover:translate-x-1">
              Jetzt oeffnen
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
