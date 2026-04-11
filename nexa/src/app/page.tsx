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
    <div className="flex w-full flex-col gap-6 md:gap-8 xl:gap-10">
      <DashboardHeroSection tripCount={tripCount} placeCount={placeCount} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] xl:items-stretch">
        <DashboardQuickActions />

        <DashboardStatsSection
          tripCount={tripCount}
          placeCount={placeCount}
          recentTripCount={recentTrips.length}
          recentPlaceCount={recentPlaces.length}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2 xl:items-stretch">
        <RecentTripsCard trips={recentTrips} />
        <RecentPlacesCard places={recentPlaces} />
      </section>
    </div>
  );
}
