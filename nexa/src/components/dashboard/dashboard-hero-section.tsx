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
    <section className="overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(248,243,235,0.9))] px-5 py-6 shadow-[0_28px_80px_rgba(32,24,16,0.08)] sm:px-6 md:px-8 md:py-8 xl:px-10 xl:py-9 2xl:px-12 2xl:py-10">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.78fr)] xl:items-end">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-accent">Dashboard</p>
            <span className="rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-xs font-medium text-muted">
              Premium travel journal
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-[2.45rem] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl xl:text-[4.6rem] xl:leading-[1.01] 2xl:max-w-[15ch]">
              Welcome back.
              <span className="block text-foreground/72">
                Dein Journal bleibt klar, ruhig und reisefertig.
              </span>
            </h1>
            <p className="max-w-3xl text-[0.98rem] leading-7 text-muted md:text-lg">
              {hasContent
                ? `Du verwaltest aktuell ${formatCount(
                    tripCount,
                    "Trip",
                    "Trips",
                  )} und ${formatCount(
                    placeCount,
                    "Place",
                    "Places",
                  )}. Oeffne zuletzt bearbeitete Inhalte oder setze direkt den naechsten Eintrag.`
                : "Noch ist dein Journal leer. Lege den ersten Trip oder Ort an und baue dir eine klare Reisehistorie auf."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[#1f6b57] px-4 py-2.5 font-semibold text-white shadow-[0_12px_24px_rgba(31,107,87,0.22)]">
              {formatCount(tripCount, "Trip", "Trips")}
            </span>
            <span className="rounded-full border border-black/8 bg-white/78 px-4 py-2.5 font-medium text-foreground/78">
              {formatCount(placeCount, "Place", "Places")}
            </span>
            <span className="rounded-full border border-black/8 bg-white/65 px-4 py-2.5 font-medium text-muted">
              Alles auf einen Blick
            </span>
          </div>
        </div>

        <aside className="rounded-[1.9rem] border border-black/8 bg-[#f5ecdf]/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:p-6 xl:min-h-full">
          <p className="eyebrow text-accent-warm">Today</p>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-medium text-muted">Im Fokus</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {hasContent
                  ? "Recent content zuerst, Kennzahlen danach."
                  : "Starte mit einem ruhigen, klaren ersten Eintrag."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border-t border-black/8 pt-4">
                <p className="text-sm text-muted">Trips</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {tripCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Reisen mit Zeitraum, Region und Land strukturiert verwalten.
                </p>
              </div>
              <div className="border-t border-black/8 pt-4">
                <p className="text-sm text-muted">Places</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {placeCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Gespeicherte Orte bleiben direkt im Reisekontext abrufbar.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
