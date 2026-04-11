import Link from "next/link";
import type { Place } from "@/types/entities";

type PlacesListProps = {
  places: Place[];
};

export function PlacesList({ places }: PlacesListProps) {
  if (places.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-black/10 bg-[#faf6f0] p-10 text-center">
        <p className="eyebrow text-accent">Noch leer</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Save your first place
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
          Ein Ort genuegt, um Karte, Timeline und Reisekontext mit Leben zu
          fuellen.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
      {places.map((place) => (
        <Link
          key={place.id}
          href={`/places/${place.id}`}
          className="group rounded-[1.75rem] border border-black/8 bg-white/88 p-6 shadow-[0_14px_36px_rgba(32,24,16,0.04)] transition hover:-translate-y-0.5 hover:border-accent/25 hover:bg-white hover:shadow-[0_20px_48px_rgba(32,24,16,0.08)]"
        >
          <div className="flex h-full flex-col gap-5">
            <div>
              <p className="eyebrow text-accent">
                {place.country_name || "Place"}
                {place.country_code ? ` • ${place.country_code}` : ""}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {place.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {place.address || "Keine Adresse hinterlegt"}
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4">
              <p className="font-mono text-xs text-muted">
                {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
              </p>
              <span className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                Ort ansehen
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
