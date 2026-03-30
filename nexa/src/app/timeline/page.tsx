import { TimelineList } from "@/components/timeline/timeline-list";
import { getCurrentUserPlaces } from "@/services/placeService";
import { getCurrentUserTripsForPlaces } from "@/services/tripPlaceService";

function groupPlacesByDate(
  places: Awaited<ReturnType<typeof getCurrentUserPlaces>>,
  tripsByPlaceId: Record<string, Awaited<ReturnType<typeof getCurrentUserTripsForPlaces>>[string]>,
) {
  const groups = new Map<
    string,
    {
      dateLabel: string;
      entries: {
        place: (typeof places)[number];
        trips: NonNullable<(typeof tripsByPlaceId)[string]>;
      }[];
    }
  >();

  for (const place of places) {
    const dateLabel = place.created_at.slice(0, 10);

    if (!groups.has(dateLabel)) {
      groups.set(dateLabel, {
        dateLabel,
        entries: [],
      });
    }

    groups.get(dateLabel)?.entries.push({
      place,
      trips: tripsByPlaceId[place.id] ?? [],
    });
  }

  return [...groups.values()];
}

export default async function TimelinePage() {
  const places = await getCurrentUserPlaces();
  const tripsByPlaceId = await getCurrentUserTripsForPlaces(
    places.map((place) => place.id),
  );
  const groups = groupPlacesByDate(places, tripsByPlaceId);

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Timeline</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Chronologische Places Timeline
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Alle Places des aktuell eingeloggten Users, gruppiert nach Datum und
          sortiert nach dem neuesten Eintrag zuerst.
        </p>
      </section>

      <TimelineList groups={groups} />
    </div>
  );
}
