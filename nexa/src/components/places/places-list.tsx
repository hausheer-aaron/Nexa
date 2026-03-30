import Link from "next/link";
import type { Place } from "@/types/entities";

type PlacesListProps = {
  places: Place[];
};

export function PlacesList({ places }: PlacesListProps) {
  if (places.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-border bg-white/45 p-6 text-sm text-muted">
        Noch keine Places vorhanden. Lege den ersten Ort mit dem Formular an.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {places.map((place) => (
        <Link
          key={place.id}
          href={`/places/${place.id}`}
          className="rounded-[1.75rem] border border-border bg-white/62 p-6 transition-colors hover:border-accent/35 hover:bg-white/78"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="eyebrow text-accent">
                {place.country_name || "Place"}
                {place.country_code ? ` • ${place.country_code}` : ""}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {place.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {place.address || "Keine Adresse hinterlegt"}
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-xs text-muted">
                {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
              </p>
              <span className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-2 text-sm font-semibold text-accent">
                Details ansehen
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
