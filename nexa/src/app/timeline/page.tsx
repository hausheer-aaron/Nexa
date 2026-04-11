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
    <div className="space-y-6 md:space-y-8 xl:space-y-10">
      <section className="overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(248,243,235,0.9))] px-5 py-6 shadow-[0_28px_80px_rgba(32,24,16,0.08)] sm:px-6 md:px-8 md:py-8 xl:px-10 xl:py-9">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-accent">Timeline</p>
              <span className="rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-xs font-medium text-muted">
                Chronologische Ansicht
              </span>
            </div>
            <h1 className="max-w-4xl text-[2.45rem] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl xl:text-[4.4rem] xl:leading-[1.02]">
              Dein Journal,
              <span className="block text-foreground/72">
                in ruhiger zeitlicher Reihenfolge gelesen.
              </span>
            </h1>
            <p className="max-w-3xl text-[0.98rem] leading-7 text-muted md:text-lg">
              Hier erscheinen gespeicherte Orte als chronologische
              Journal-Eintraege mit Datum, Notiz und zugeordneten Reisen.
              Neueste Eintraege stehen oben.
            </p>
          </div>

          <div className="rounded-[1.7rem] border border-black/8 bg-white/72 px-5 py-4">
            <p className="text-sm text-muted">Aktueller Stand</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {groups.length}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {groups.length === 0
                ? "Noch keine Tage mit Journal-Eintraegen."
                : `${groups.length} ${groups.length === 1 ? "Tag" : "Tage"} mit Eintraegen.`}
            </p>
          </div>
        </div>
      </section>

      <TimelineList groups={groups} />
    </div>
  );
}
