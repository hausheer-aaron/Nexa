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
    <article className="rounded-[1.9rem] border border-border bg-white p-6 shadow-[0_16px_40px_rgba(32,24,16,0.05)] md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent">Recent Trips</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Zuletzt erstellt
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Die neuesten Reisen im schnellen Zugriff.
          </p>
        </div>
        <Link
          href="/trips"
          className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-surface-strong"
        >
          Alle Trips
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-border bg-surface-strong p-5">
          <p className="font-semibold text-foreground">
            Noch keine Trips vorhanden
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Lege deinen ersten Trip an, damit deine Reisezeitleiste und Route
            hier sichtbar werden.
          </p>
          <Link
            href="/trips"
            className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            Jetzt Trip anlegen
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="block rounded-[1.5rem] border border-border bg-surface-strong p-5 transition hover:border-accent/30 hover:bg-white"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {trip.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {formatDateRange(trip.start_date, trip.end_date)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {[trip.region, trip.country].filter(Boolean).join(", ") ||
                      "Ohne Region oder Land"}
                  </p>
                </div>
                <div className="text-sm font-semibold text-accent">
                  Trip oeffnen
                </div>
              </div>
              <p className="sr-only">
                {formatDateRange(trip.start_date, trip.end_date)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
