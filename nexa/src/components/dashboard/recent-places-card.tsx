import Link from "next/link";
import type { Place } from "@/types/entities";

type RecentPlacesCardProps = {
  places: Place[];
};

function formatCoordinates(latitude: number, longitude: number) {
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}

export function RecentPlacesCard({ places }: RecentPlacesCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-accent">Places</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Zuletzt gespeichert
          </h2>
        </div>
        <Link
          href="/places"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-accent/40 hover:bg-white"
        >
          Alle Places
        </Link>
      </div>

      {places.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] bg-surface-strong p-5">
          <p className="font-semibold">Noch keine Places vorhanden</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Speichere deinen ersten Ort, damit er hier im Dashboard erscheint.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              className="block rounded-[1.5rem] bg-surface-strong p-5 transition hover:border-accent/30 hover:bg-white"
            >
              <p className="text-lg font-semibold">{place.name}</p>
              <p className="mt-1 text-sm text-muted">
                {place.address || formatCoordinates(place.latitude, place.longitude)}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {place.note || place.country_name || "Ohne zusaetzliche Details"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
