import type { Trip } from "@/types/entities";

type TripDetailCardProps = {
  trip: Trip;
};

export function TripDetailCard({ trip }: TripDetailCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">{trip.country || "Trip"}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{trip.title}</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] bg-surface-strong p-4">
          <p className="text-sm text-muted">Region</p>
          <p className="mt-2 text-lg font-semibold">{trip.region || "-"}</p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-strong p-4">
          <p className="text-sm text-muted">Land</p>
          <p className="mt-2 text-lg font-semibold">{trip.country || "-"}</p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-strong p-4">
          <p className="text-sm text-muted">Startdatum</p>
          <p className="mt-2 text-lg font-semibold">{trip.start_date}</p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-strong p-4">
          <p className="text-sm text-muted">Enddatum</p>
          <p className="mt-2 text-lg font-semibold">{trip.end_date}</p>
        </div>
      </div>
    </article>
  );
}
