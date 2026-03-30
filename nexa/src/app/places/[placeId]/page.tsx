import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceDetailCard } from "@/components/places/place-detail-card";
import { PlaceManagePanel } from "@/components/places/place-manage-panel";
import { PlaceTripAssignment } from "@/components/places/place-trip-assignment";
import { getCurrentUserPlaceById } from "@/services/placeService";
import { getCurrentUserTrips } from "@/services/tripService";
import { getCurrentUserTripsForPlace } from "@/services/tripPlaceService";

type PlaceDetailPageProps = {
  params: Promise<{ placeId: string }>;
};

export default async function PlaceDetailPage({
  params,
}: PlaceDetailPageProps) {
  const { placeId } = await params;
  const [place, allTrips, assignedTrips] = await Promise.all([
    getCurrentUserPlaceById(placeId),
    getCurrentUserTrips(),
    getCurrentUserTripsForPlace(placeId),
  ]);

  if (!place) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/places"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Zurueck zu Places
        </Link>
      </div>

      <PlaceDetailCard place={place} />
      <PlaceManagePanel place={place} />
      <PlaceTripAssignment
        placeId={place.id}
        allTrips={allTrips}
        assignedTrips={assignedTrips}
      />
    </div>
  );
}
