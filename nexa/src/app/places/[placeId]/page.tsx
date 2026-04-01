import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceDetailActions } from "@/components/places/place-detail-actions";
import { PlaceDetailCard } from "@/components/places/place-detail-card";
import { PlaceTripList } from "@/components/places/place-trip-list";
import { getCurrentUserPlaceById } from "@/services/placeService";
import { getCurrentUserTripsForPlace } from "@/services/tripPlaceService";

type PlaceDetailPageProps = {
  params: Promise<{ placeId: string }>;
};

export default async function PlaceDetailPage({
  params,
}: PlaceDetailPageProps) {
  const { placeId } = await params;
  const [place, assignedTrips] = await Promise.all([
    getCurrentUserPlaceById(placeId),
    getCurrentUserTripsForPlace(placeId),
  ]);

  if (!place) {
    notFound();
  }

  return (
    <div className="space-y-8 xl:space-y-10">
      <div>
        <Link
          href="/places"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Zurueck zu Places
        </Link>
      </div>

      <PlaceDetailCard place={place} tripCount={assignedTrips.length} />
      <PlaceDetailActions place={place} />
      <PlaceTripList trips={assignedTrips} />
    </div>
  );
}
