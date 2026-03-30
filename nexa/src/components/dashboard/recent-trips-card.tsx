import Link from "next/link";
import type { Trip } from "@/types/entities";

type RecentTripsCardProps = {
  trips: Trip[];
};

function formatDateRange(startDate: string, endDate: string) {
  return `${startDate} - ${endDate}`;
}

export function RecentTripsCard({ trips }: RecentTripsCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-accent">Trips</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Zuletzt erstellt
          </h2>
        </div>
        <Link
          href="/trips"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-accent/40 hover:bg-white"
        >
          Alle Trips
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] bg-surface-strong p-5">
          <p className="font-semibold">Noch keine Trips vorhanden</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Lege deinen ersten Trip an, damit er hier im Dashboard erscheint.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="block rounded-[1.5rem] bg-surface-strong p-5 transition hover:border-accent/30 hover:bg-white"
            >
              <p className="text-lg font-semibold">{trip.title}</p>
              <p className="mt-1 text-sm text-muted">
                {formatDateRange(trip.start_date, trip.end_date)}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {[trip.region, trip.country].filter(Boolean).join(", ") ||
                  "Ohne Region oder Land"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
