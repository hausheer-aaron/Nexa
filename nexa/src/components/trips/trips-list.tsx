import Link from "next/link";
import type { Trip } from "@/types/entities";

type TripsListProps = {
  trips: Trip[];
};

export function TripsList({ trips }: TripsListProps) {
  if (trips.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-black/10 bg-[#faf6f0] p-10 text-center">
        <p className="eyebrow text-accent">Noch leer</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Lege deinen ersten Trip an
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
          Lege die erste Reise an und schaffe den Ausgangspunkt fuer Timeline,
          Orte und Route.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
      {trips.map((trip) => (
        <Link
          key={trip.id}
          href={`/trips/${trip.id}`}
          className="group rounded-[1.75rem] border border-black/8 bg-white/88 p-6 shadow-[0_14px_36px_rgba(32,24,16,0.04)] transition hover:-translate-y-0.5 hover:border-accent/25 hover:bg-white hover:shadow-[0_20px_48px_rgba(32,24,16,0.08)]"
        >
          <div className="flex h-full flex-col gap-5">
            <div>
              <p className="eyebrow text-accent">
                {trip.country || "Trip"}
                {trip.region ? ` • ${trip.region}` : ""}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {trip.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {trip.start_date} - {trip.end_date}
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4">
              <div className="rounded-[1.2rem] bg-[#f7f3ec] px-4 py-3 text-sm text-muted">
                Zeitraum festgelegt
              </div>
              <span className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                Trip ansehen
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
