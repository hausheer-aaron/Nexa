import type { Trip } from "@/types/entities";

type PlaceTripListProps = {
  trips: Trip[];
};

export function PlaceTripList({ trips }: PlaceTripListProps) {
  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">Zugeordnete Trips</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Dieser Place gehoert zu folgenden Trips
      </h2>

      {trips.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
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
        <p className="mt-4 text-sm text-muted">
          Dieser Place ist aktuell noch keinem Trip zugeordnet.
        </p>
      )}
    </section>
  );
}
