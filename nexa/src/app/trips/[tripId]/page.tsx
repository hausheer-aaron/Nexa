import Link from "next/link";
import { notFound } from "next/navigation";
import { TripDetailActions } from "@/components/trips/trip-detail-actions";
import { TripDetailCard } from "@/components/trips/trip-detail-card";
import { TripPlaceAssignmentManager } from "@/components/trips/trip-place-assignment-manager";
import { TripPlacesList } from "@/components/trips/trip-places-list";
import { TripRouteMapShell } from "@/components/trips/trip-route-map-shell";
import { getCurrentUserPlaces } from "@/services/placeService";
import { getCurrentUserPlacesForTrip } from "@/services/tripPlaceService";
import { getCurrentUserTripById } from "@/services/tripService";

type TripDetailPageProps = {
  params: Promise<{ tripId: string }>;
};

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { tripId } = await params;
  const [trip, places, allPlaces] = await Promise.all([
    getCurrentUserTripById(tripId),
    getCurrentUserPlacesForTrip(tripId),
    getCurrentUserPlaces(),
  ]);

  if (!trip) {
    notFound();
  }

  return (
    <div className="space-y-8 xl:space-y-10">
      <div>
        <Link
          href="/trips"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Zurueck zu Trips
        </Link>
      </div>

      <TripDetailCard trip={trip} placeCount={places.length} />
      <TripDetailActions trip={trip} />
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <TripPlaceAssignmentManager
          tripId={trip.id}
          assignedPlaces={places}
          allPlaces={allPlaces}
        />
        <TripPlacesList places={places} />
      </section>
      <section className="rounded-[2rem] border border-border bg-[#eef5f1] p-6 shadow-[0_18px_44px_rgba(32,24,16,0.04)]">
        <div className="mb-5">
          <p className="eyebrow text-accent">Trip Route</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Route und Ortspunkte
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Die Karte zeigt die zugeordneten Orte in ihrer chronologischen
            Reihenfolge. So wird aus dem Trip eine zusammenhaengende Route statt
            einer blossen Datensammlung.
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-accent/10 bg-white p-3">
          <TripRouteMapShell places={places} />
        </div>
      </section>
    </div>
  );
}
