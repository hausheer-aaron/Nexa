import Link from "next/link";
import type { Trip } from "@/types/entities";

type TripsListProps = {
  trips: Trip[];
};

export function TripsList({ trips }: TripsListProps) {
  if (trips.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-border bg-white/45 p-6 text-sm text-muted">
        Noch keine Trips vorhanden. Lege den ersten Trip mit dem Formular an.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {trips.map((trip) => (
        <Link
          key={trip.id}
          href={`/trips/${trip.id}`}
          className="rounded-[1.75rem] border border-border bg-white/62 p-6 transition-colors hover:border-accent/35 hover:bg-white/78"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="eyebrow text-accent">
                {trip.country || "Trip"}
                {trip.region ? ` • ${trip.region}` : ""}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {trip.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {trip.start_date} - {trip.end_date}
              </p>
            </div>

            <span className="rounded-full bg-accent-soft px-3 py-2 text-sm font-semibold text-accent">
              Details ansehen
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
