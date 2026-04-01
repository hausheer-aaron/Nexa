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
    <div className="space-y-8 xl:space-y-10">
      <section className="rounded-[2rem] border border-border bg-white px-6 py-7 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:px-8 md:py-8">
        <p className="eyebrow text-accent">Timeline</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Dein Journal in der Zeitachse
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Hier erscheinen gespeicherte Orte als chronologische Journal-Eintraege
          mit Datum, Notiz und zugeordneten Reisen. Neueste Eintraege stehen
          oben.
        </p>
      </section>

      <TimelineList groups={groups} />
    </div>
  );
}
