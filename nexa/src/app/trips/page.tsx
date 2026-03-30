import { places, trips } from "@/data/mock-data";

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Trips</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Reisen als eigener Bereich vorbereitet
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Diese Route bildet bereits Titel, Zeitraum, Region und die Idee einer
          chronologischen Route pro Trip ab.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {trips.map((trip) => {
          const relatedPlaces = places.filter((place) =>
            place.tripIds.includes(trip.id),
          );

          return (
            <article
              key={trip.id}
              className="rounded-[1.75rem] border border-border bg-white/62 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow text-accent">{trip.country ?? "Trip"}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    {trip.title}
                  </h2>
                </div>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                  {relatedPlaces.length} Places
                </span>
              </div>

              <p className="mt-3 text-sm text-muted">
                {trip.startDate} - {trip.endDate}
                {trip.region ? ` • ${trip.region}` : ""}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">{trip.summary}</p>

              <div className="mt-6 rounded-[1.5rem] bg-surface-strong p-4">
                <p className="eyebrow text-muted">Route Preview</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedPlaces.map((place, index) => (
                    <div key={place.id} className="flex items-center gap-3">
                      <div className="rounded-full bg-accent px-3 py-2 text-sm font-semibold text-white">
                        {place.name}
                      </div>
                      {index < relatedPlaces.length - 1 ? (
                        <div className="h-px w-10 bg-accent/35" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
