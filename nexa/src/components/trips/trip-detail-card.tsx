import type { Trip } from "@/types/entities";

type TripDetailCardProps = {
  trip: Trip;
  placeCount?: number;
};

export function TripDetailCard({ trip, placeCount = 0 }: TripDetailCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_18px_44px_rgba(32,24,16,0.05)]">
      <div className="border-b border-border bg-[#f7efe5] px-6 py-7 md:px-8">
        <p className="eyebrow text-accent">
          {trip.country || "Trip"}
          {trip.region ? ` • ${trip.region}` : ""}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {trip.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
          Reisezeitraum, Regionen und zugeordnete Orte bleiben hier in einer
          ruhigen Uebersicht gebuendelt.
        </p>
      </div>

      <div className="px-6 py-6 md:px-8 md:py-7">
        <div className="grid gap-4 lg:grid-cols-4">
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

        <div className="mt-4 rounded-[1.5rem] border border-border bg-white px-5 py-4">
          <p className="text-sm text-muted">Kontext</p>
          <p className="mt-2 text-base leading-7 text-foreground/80">
            Dieser Trip enthaelt aktuell {placeCount}{" "}
            {placeCount === 1 ? "zugeordneten Ort" : "zugeordnete Orte"}.
          </p>
        </div>
      </div>
    </article>
  );
}
