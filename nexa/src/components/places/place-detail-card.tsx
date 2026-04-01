import type { Place } from "@/types/entities";

type PlaceDetailCardProps = {
  place: Place;
  tripCount?: number;
};

export function PlaceDetailCard({ place, tripCount = 0 }: PlaceDetailCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_18px_44px_rgba(32,24,16,0.05)]">
      <div className="border-b border-border bg-[#eef5f1] px-6 py-7 md:px-8">
        <p className="eyebrow text-accent">
          {place.country_name || "Place"}
          {place.country_code ? ` • ${place.country_code}` : ""}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {place.name}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
          Ein einzelner Ort mit Adresse, Koordinaten, Notiz und seinem
          aktuellen Reisekontext.
        </p>
      </div>

      <div className="px-6 py-6 md:px-8 md:py-7">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] bg-surface-strong p-4 lg:col-span-2">
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
          <div className="rounded-[1.5rem] bg-surface-strong p-4 lg:col-span-2">
            <p className="text-sm text-muted">Notiz</p>
            <p className="mt-2 text-lg font-semibold">{place.note || "-"}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-border bg-white px-5 py-4">
          <p className="text-sm text-muted">Kontext</p>
          <p className="mt-2 text-base leading-7 text-foreground/80">
            Dieser Ort ist aktuell in {tripCount}{" "}
            {tripCount === 1 ? "Trip enthalten" : "Trips enthalten"}.
          </p>
        </div>
      </div>
    </article>
  );
}
