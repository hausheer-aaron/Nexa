import Link from "next/link";
import { notFound } from "next/navigation";
import { TripDetailCard } from "@/components/trips/trip-detail-card";
import { TripManagePanel } from "@/components/trips/trip-manage-panel";
import { TripPlacesList } from "@/components/trips/trip-places-list";
import { TripRouteMapShell } from "@/components/trips/trip-route-map-shell";
import { getCurrentUserPlacesForTrip } from "@/services/tripPlaceService";
import { getCurrentUserTripById } from "@/services/tripService";

type TripDetailPageProps = {
  params: Promise<{ tripId: string }>;
};

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { tripId } = await params;
  const [trip, places] = await Promise.all([
    getCurrentUserTripById(tripId),
    getCurrentUserPlacesForTrip(tripId),
  ]);

  if (!trip) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/trips"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Zurueck zu Trips
        </Link>
      </div>

      <TripDetailCard trip={trip} />
      <TripManagePanel trip={trip} />
      <section className="rounded-[1.75rem] border border-border bg-[#dbe8df] p-6">
        <div className="mb-5">
          <p className="eyebrow text-accent">Trip Route</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Einfache Kartenansicht des Trips
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Die Marker und die Verbindungslinie folgen der Reihenfolge nach
            `created_at`.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-accent/15 bg-white/45 p-3">
          <TripRouteMapShell places={places} />
        </div>
      </section>
      <TripPlacesList places={places} />
    </div>
  );
}
