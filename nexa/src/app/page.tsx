import Link from "next/link";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { RecentPlacesCard } from "@/components/dashboard/recent-places-card";
import { RecentTripsCard } from "@/components/dashboard/recent-trips-card";
import {
  getCurrentUserPlaceCount,
  getCurrentUserRecentPlaces,
} from "@/services/placeService";
import {
  getCurrentUserRecentTrips,
  getCurrentUserTripCount,
} from "@/services/tripService";

export default async function HomePage() {
  const [tripCount, placeCount, recentTrips, recentPlaces] = await Promise.all([
    getCurrentUserTripCount(),
    getCurrentUserPlaceCount(),
    getCurrentUserRecentTrips(),
    getCurrentUserRecentPlaces(),
  ]);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border bg-[linear-gradient(135deg,rgba(31,107,87,0.95),rgba(23,49,43,0.92))] p-6 text-white md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/65">Dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Deine Reisen auf einen Blick.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/78 md:text-lg">
              Das Dashboard zeigt dir echte Daten des aktuell eingeloggten
              Users: kompakte Kennzahlen, letzte Trips und zuletzt gespeicherte
              Places.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/trips"
              className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold text-white hover:bg-white/14"
            >
              Trips verwalten
            </Link>
            <Link
              href="/places"
              className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold text-white hover:bg-white/14"
            >
              Places verwalten
            </Link>
            <Link
              href="/map"
              className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold text-white hover:bg-white/14"
            >
              Karte oeffnen
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <DashboardStatCard
          label="Trips"
          value={tripCount}
          detail={
            tripCount === 0
              ? "Noch keine Reisen angelegt."
              : "Alle Reisen des aktuell eingeloggten Users."
          }
        />
        <DashboardStatCard
          label="Places"
          value={placeCount}
          detail={
            placeCount === 0
              ? "Noch keine Orte gespeichert."
              : "Alle gespeicherten Orte des aktuell eingeloggten Users."
          }
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <RecentTripsCard trips={recentTrips} />
        <RecentPlacesCard places={recentPlaces} />
      </section>
    </div>
  );
}
