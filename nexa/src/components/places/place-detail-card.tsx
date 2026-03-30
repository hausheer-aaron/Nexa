import type { Place } from "@/types/entities";

type PlaceDetailCardProps = {
  place: Place;
};

export function PlaceDetailCard({ place }: PlaceDetailCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">
        {place.country_name || "Place"}
        {place.country_code ? ` • ${place.country_code}` : ""}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{place.name}</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] bg-surface-strong p-4 md:col-span-2">
          <p className="text-sm text-muted">Adresse</p>
          <p className="mt-2 text-lg font-semibold">
            {place.address || "-"}
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-strong p-4">
          <p className="text-sm text-muted">Latitude</p>
          <p className="mt-2 text-lg font-semibold">{place.latitude}</p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-strong p-4">
          <p className="text-sm text-muted">Longitude</p>
          <p className="mt-2 text-lg font-semibold">{place.longitude}</p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-strong p-4 md:col-span-2">
          <p className="text-sm text-muted">Notiz</p>
          <p className="mt-2 text-lg font-semibold">{place.note || "-"}</p>
        </div>
      </div>
    </article>
  );
}
