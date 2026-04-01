type DashboardHeroSectionProps = {
  tripCount: number;
  placeCount: number;
};

function formatCount(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export function DashboardHeroSection({
  tripCount,
  placeCount,
}: DashboardHeroSectionProps) {
  const hasContent = tripCount > 0 || placeCount > 0;

  return (
    <section className="rounded-[2rem] border border-border bg-white px-6 py-8 shadow-[0_24px_60px_rgba(32,24,16,0.08)] md:px-8 md:py-10 xl:px-10 xl:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:items-end">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="eyebrow text-accent">Dashboard</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl xl:text-6xl">
              Welcome back. Dein Travel Journal ist bereit fuer den naechsten
              Stop.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              {hasContent
                ? `Du verwaltest aktuell ${formatCount(
                    tripCount,
                    "Trip",
                    "Trips",
                  )} und ${formatCount(
                    placeCount,
                    "Place",
                    "Places",
                  )}. Starte direkt mit dem naechsten Eintrag oder springe in deine Karte.`
                : "Noch ist dein Journal leer. Lege den ersten Trip oder den ersten gespeicherten Ort an und baue dir eine klare Reisehistorie auf."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full border border-border bg-surface-strong px-4 py-2">
              {formatCount(tripCount, "Trip", "Trips")}
            </span>
            <span className="rounded-full border border-border bg-surface-strong px-4 py-2">
              {formatCount(placeCount, "Place", "Places")}
            </span>
            <span className="rounded-full border border-border bg-surface-strong px-4 py-2">
              Alles auf einen Blick
            </span>
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-border bg-[#f7efe5] p-5 md:p-6">
          <p className="eyebrow text-accent-warm">Heute im Fokus</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-sm text-muted">Trips</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {tripCount}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Plane Reisen sauber nach Zeitraum, Region und Land.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-sm text-muted">Places</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {placeCount}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Jeder gespeicherte Ort bleibt direkt im Reisekontext abrufbar.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
