import Link from "next/link";
import type { Trip } from "@/types/entities";

type RecentTripsCardProps = {
  trips: Trip[];
};

function formatDateRange(startDate: string, endDate: string) {
  const formatter = new Intl.DateTimeFormat("de-CH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(
    new Date(endDate),
  )}`;
}

export function RecentTripsCard({ trips }: RecentTripsCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-white/84 p-5 shadow-[0_22px_60px_rgba(32,24,16,0.05)] sm:p-6 md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent">Recent Trips</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Zuletzt erstellt
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
            Die neuesten Reisen im schnellen Zugriff, damit Zeitraeume und Ziele
            sofort scanbar bleiben.
          </p>
        </div>
        <Link
          href="/trips"
          className="inline-flex rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/30 hover:bg-white"
        >
          Alle Trips
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col rounded-[1.6rem] border border-dashed border-black/10 bg-[#faf6f0] p-6">
          <p className="font-semibold text-foreground">
            Noch keine Trips vorhanden
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Lege deinen ersten Trip an, damit deine Reisezeitleiste und Route
            hier sichtbar werden.
          </p>
          <Link
            href="/trips"
            className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,107,87,0.22)]"
          >
            Jetzt Trip anlegen
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex-1 divide-y divide-black/6">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="group block rounded-[1.4rem] px-1 py-5 transition first:pt-0 last:pb-0 hover:bg-[#fcfaf6]"
            >
              <div className="flex flex-col gap-4 rounded-[1.4rem] px-3 py-3.5 sm:px-4 sm:py-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-xl font-semibold tracking-tight text-foreground">
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
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#edf5f1] px-3 py-1.5 text-xs font-medium text-accent">
                    Open
                  </span>
                  <div className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                    Trip oeffnen
                  </div>
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
