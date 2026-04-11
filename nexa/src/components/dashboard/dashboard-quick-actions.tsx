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
    <section className="flex h-full flex-col rounded-[1.9rem] border border-black/8 bg-white/78 p-4 shadow-[0_18px_44px_rgba(32,24,16,0.05)] sm:p-5 md:p-6">
      <div className="flex flex-col gap-2">
        <p className="eyebrow text-muted">Quick Actions</p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Direkt weitermachen
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted">
          Die schnellsten Einstiege fuer neue Inhalte und den Wechsel in die
          Karte.
        </p>
      </div>

      <div className="mt-4 grid flex-1 content-start gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center gap-3 rounded-[1.25rem] border border-black/8 bg-white/72 px-3.5 py-3.5 transition hover:-translate-y-0.5 hover:border-accent/25 hover:bg-white sm:gap-4 sm:px-4 sm:py-4"
          >
            <span
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.18em] ${action.accentClass}`}
            >
              Go
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
                {action.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                {action.description}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-accent transition group-hover:translate-x-1">
              Open
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
