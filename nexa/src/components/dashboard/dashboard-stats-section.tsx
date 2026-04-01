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
    <section className="space-y-4">
      <div>
        <p className="eyebrow text-muted">Stats</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Kompakte Kennzahlen
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
