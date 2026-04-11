import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";

type DashboardStatsSectionProps = {
  tripCount: number;
  placeCount: number;
  recentTripCount: number;
  recentPlaceCount: number;
};

export function DashboardStatsSection({
  tripCount,
  placeCount,
  recentTripCount,
  recentPlaceCount,
}: DashboardStatsSectionProps) {
  return (
    <section className="flex h-full flex-col rounded-[1.9rem] border border-black/8 bg-[#fbf7f1] p-4 sm:p-5 md:p-6">
      <div>
        <p className="eyebrow text-muted">Stats</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Kompakte Kennzahlen
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Leise, schnell lesbare Orientierung fuer deinen aktuellen Bestand.
        </p>
      </div>

      <div className="mt-4 grid flex-1 content-start gap-3 sm:grid-cols-2">
        <DashboardStatCard
          label="Trips"
          value={tripCount}
          detail={
            tripCount === 0
              ? "Noch keine Reisen angelegt."
              : "Alle aktuell gespeicherten Reisen."
          }
        />
        <DashboardStatCard
          label="Places"
          value={placeCount}
          detail={
            placeCount === 0
              ? "Noch keine Orte gespeichert."
              : "Gespeicherte Orte im Journal."
          }
        />
        <DashboardStatCard
          label="Letzte Trips"
          value={recentTripCount}
          detail="Eintraege im aktuellen Dashboard-Ausschnitt."
        />
        <DashboardStatCard
          label="Letzte Places"
          value={recentPlaceCount}
          detail="Zuletzt gespeicherte Orte aus Supabase."
        />
      </div>
    </section>
  );
}
