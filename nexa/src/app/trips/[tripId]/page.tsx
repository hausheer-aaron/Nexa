import Link from "next/link";
import { notFound } from "next/navigation";
import { TripDetailActions } from "@/components/trips/trip-detail-actions";
import { TripDetailCard } from "@/components/trips/trip-detail-card";
import { TripPlaceAssignmentManager } from "@/components/trips/trip-place-assignment-manager";
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
    <div className="space-y-6 md:space-y-8 xl:space-y-10">
      <div>
        <Link
          href="/trips"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Zurueck zu Trips
        </Link>
      </div>

      <section className="overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(248,243,235,0.9))] p-5 shadow-[0_28px_80px_rgba(32,24,16,0.08)] md:p-6 xl:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow text-accent">Trip Route</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Route und Ortspunkte
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted md:text-base">
              Die Karte zeigt die zugeordneten Orte in ihrer chronologischen
              Reihenfolge. So wird aus dem Trip direkt eine lesbare Route statt
              einer blossen Datensammlung.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-black/8 bg-white/72 px-5 py-4">
            <p className="text-sm text-muted">Zuordnung</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {places.length}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {places.length === 0
                ? "Noch keine Orte in dieser Route."
                : `${places.length} ${places.length === 1 ? "Ort" : "Orte"} aktuell zugeordnet.`}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.7rem] border border-accent/10 bg-white/92 p-3">
          <TripRouteMapShell places={places} />
        </div>
      </section>

      <TripDetailCard
        trip={trip}
        placeCount={places.length}
        actions={<TripDetailActions trip={trip} compact />}
      />

      <section>
        <TripPlaceAssignmentManager
          tripId={trip.id}
          assignedPlaces={places}
          allPlaces={allPlaces}
        />
      </section>
    </div>
  );
}
