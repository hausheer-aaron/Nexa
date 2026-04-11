import type { ReactNode } from "react";
import type { Trip } from "@/types/entities";

type TripDetailCardProps = {
  trip: Trip;
  placeCount?: number;
  actions?: ReactNode;
};

export function TripDetailCard({
  trip,
  placeCount = 0,
  actions,
}: TripDetailCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.9rem] border border-black/8 bg-white/82 shadow-[0_18px_44px_rgba(32,24,16,0.05)]">
      <div className="border-b border-black/8 bg-[#f7efe5] px-5 py-6 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow text-accent">
              {trip.country || "Trip"}
              {trip.region ? ` • ${trip.region}` : ""}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-[2.35rem]">
              {trip.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              Reisezeitraum, Region und zugeordnete Orte bleiben hier kompakt
              gebuendelt, waehrend die Route den visuellen Fokus behaelt.
            </p>
          </div>

          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      </div>

      <div className="px-5 py-5 md:px-6 md:py-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.35rem] bg-[#faf7f1] p-4">
            <p className="text-sm text-muted">Region</p>
            <p className="mt-2 text-lg font-semibold">{trip.region || "-"}</p>
          </div>
          <div className="rounded-[1.35rem] bg-[#faf7f1] p-4">
            <p className="text-sm text-muted">Land</p>
            <p className="mt-2 text-lg font-semibold">{trip.country || "-"}</p>
          </div>
          <div className="rounded-[1.35rem] bg-[#faf7f1] p-4">
            <p className="text-sm text-muted">Startdatum</p>
            <p className="mt-2 text-lg font-semibold">{trip.start_date}</p>
          </div>
          <div className="rounded-[1.35rem] bg-[#faf7f1] p-4">
            <p className="text-sm text-muted">Enddatum</p>
            <p className="mt-2 text-lg font-semibold">{trip.end_date}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[1.35rem] border border-black/8 bg-white/72 px-4 py-4">
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
