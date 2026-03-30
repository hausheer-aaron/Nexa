import { places, trips } from "@/data/mock-data";

export default function PlacesPage() {
  const sortedPlaces = [...places].sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Places</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Ortsliste als eigener Datenbereich
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Sortierung, Notizen und Trip-Zuordnung sind hier bereits vorbereitet.
        </p>
      </section>

      <section className="space-y-4">
        {sortedPlaces.map((place) => {
          const relatedTrips = trips.filter((trip) => place.tripIds.includes(trip.id));

          return (
            <article
              key={place.id}
              className="rounded-[1.75rem] border border-border bg-white/62 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    {place.name}
                  </p>
                  <p className="mt-2 text-sm text-muted">{place.address}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                    {place.note}
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-surface-strong px-4 py-3 text-sm">
                  <p className="eyebrow text-muted">Created</p>
                  <p className="mt-2 font-semibold">
                    {new Date(place.createdAt).toLocaleDateString("de-CH")}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-border pt-4 md:flex-row md:items-center md:justify-between">
                <p className="font-mono text-xs text-muted">
                  {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)} •{" "}
                  {place.countryName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedTrips.map((trip) => (
                    <span
                      key={trip.id}
                      className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent"
                    >
                      {trip.title}
                    </span>
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
