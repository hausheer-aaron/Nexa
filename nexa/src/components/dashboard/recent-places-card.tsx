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
    <article className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-white/84 p-5 shadow-[0_22px_60px_rgba(32,24,16,0.05)] sm:p-6 md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent">Recent Places</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Zuletzt gespeichert
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
            Deine neuesten Orte fuer schnellen Zugriff und klaren Kartenkontext.
          </p>
        </div>
        <Link
          href="/places"
          className="inline-flex rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/30 hover:bg-white"
        >
          Alle Places
        </Link>
      </div>

      {places.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col rounded-[1.6rem] border border-dashed border-black/10 bg-[#faf6f0] p-6">
          <p className="font-semibold text-foreground">
            Noch keine Places vorhanden
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Speichere den ersten Ort, damit deine Karte und Timeline hier mit
            Leben gefuellt werden.
          </p>
          <Link
            href="/places"
            className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,107,87,0.22)]"
          >
            Jetzt Place anlegen
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex-1 divide-y divide-black/6">
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              className="group block rounded-[1.4rem] px-1 py-5 transition first:pt-0 last:pb-0 hover:bg-[#fcfaf6]"
            >
              <div className="flex flex-col gap-4 rounded-[1.4rem] px-3 py-3.5 sm:px-4 sm:py-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-xl font-semibold tracking-tight text-foreground">
                    {place.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {place.address ||
                      formatCoordinates(place.latitude, place.longitude)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {place.note ||
                      place.country_name ||
                      "Ohne zusaetzliche Details"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#edf5f1] px-3 py-1.5 text-xs font-medium text-accent">
                    Open
                  </span>
                  <div className="text-sm font-semibold text-accent transition group-hover:translate-x-1">
                    Place oeffnen
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
