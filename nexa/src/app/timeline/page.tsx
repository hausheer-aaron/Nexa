import { places, trips } from "@/data/mock-data";

export default function TimelinePage() {
  const timelineEntries = [...places].sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  );

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Timeline</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Chronologische Reiseansicht als eigener Bereich
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Hier kann spaeter ein Journal-Flow entstehen, der Orte, Trips und
          Notizen entlang des Reiseverlaufs zusammenfuehrt.
        </p>
      </section>

      <section className="space-y-4">
        {timelineEntries.map((place) => {
          const relatedTrip = trips.find((trip) => place.tripIds.includes(trip.id));

          return (
            <article
              key={place.id}
              className="rounded-[1.75rem] border border-border bg-white/62 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="eyebrow text-accent">
                    {new Date(place.createdAt).toLocaleDateString("de-CH")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    {place.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{place.address}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                    {place.note}
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-accent-soft px-4 py-3 text-sm font-semibold text-accent">
                  {relatedTrip?.title ?? "Ohne Trip"}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
