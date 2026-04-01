import type { Trip } from "@/types/entities";

type PlaceTripListProps = {
  trips: Trip[];
};

export function PlaceTripList({ trips }: PlaceTripListProps) {
  return (
    <section className="rounded-[1.9rem] border border-border bg-white p-6 shadow-[0_16px_40px_rgba(32,24,16,0.04)]">
      <p className="eyebrow text-accent">Zugeordnete Trips</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Reisen mit diesem Ort
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
        <div className="mt-4 rounded-[1.5rem] border border-dashed border-border bg-[#fbfaf7] p-5 text-sm text-muted">
          Dieser Place ist aktuell noch keinem Trip zugeordnet.
        </div>
      )}
    </section>
  );
}
