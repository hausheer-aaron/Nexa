import { DashboardHeroSection } from "@/components/dashboard/dashboard-hero-section";
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions";
import { DashboardStatsSection } from "@/components/dashboard/dashboard-stats-section";
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
    <div className="flex w-full flex-col gap-8 xl:gap-10">
      <DashboardHeroSection tripCount={tripCount} placeCount={placeCount} />

      <DashboardQuickActions />

      <DashboardStatsSection
        tripCount={tripCount}
        placeCount={placeCount}
        recentTripCount={recentTrips.length}
        recentPlaceCount={recentPlaces.length}
      />

      <section className="space-y-4">
        <div>
          <p className="eyebrow text-muted">Recent Activity</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Zuletzt aktualisiert
          </h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <RecentTripsCard trips={recentTrips} />
          <RecentPlacesCard places={recentPlaces} />
        </div>
      </section>
    </div>
  );
}
