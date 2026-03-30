import Link from "next/link";
import type { Place, Trip } from "@/types/entities";

type TimelineEntry = {
  place: Place;
  trips: Trip[];
};

type TimelineGroup = {
  dateLabel: string;
  entries: TimelineEntry[];
};

type TimelineListProps = {
  groups: TimelineGroup[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "full",
  }).format(new Date(date));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function TimelineList({ groups }: TimelineListProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-border bg-white/45 p-6 text-sm text-muted">
        Noch keine Places vorhanden. Sobald du Orte speicherst, erscheinen sie
        hier chronologisch in deiner Timeline.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.dateLabel} className="space-y-4">
          <div className="sticky top-20 z-10 rounded-full border border-border bg-background/90 px-4 py-2 backdrop-blur">
            <p className="text-sm font-semibold text-foreground">
              {formatDate(group.dateLabel)}
            </p>
          </div>

          <div className="space-y-4">
            {group.entries.map(({ place, trips }) => (
              <Link
                key={place.id}
                href={`/places/${place.id}`}
                className="block rounded-[1.75rem] border border-border bg-white/62 p-6 transition-colors hover:border-accent/35 hover:bg-white/78"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="eyebrow text-accent">
                      {formatDateTime(place.created_at)}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      {place.name}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {place.address || "Keine Adresse hinterlegt"}
                    </p>
                    {place.note ? (
                      <p className="mt-4 text-sm leading-6 text-muted">
                        {place.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-3 lg:max-w-xs lg:text-right">
                    <p className="font-mono text-xs text-muted">
                      {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                    </p>

                    {trips.length > 0 ? (
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {trips.map((trip) => (
                          <span
                            key={trip.id}
                            className="rounded-full bg-accent-soft px-3 py-2 text-sm font-semibold text-accent"
                          >
                            {trip.title}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted">Keinem Trip zugeordnet</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
