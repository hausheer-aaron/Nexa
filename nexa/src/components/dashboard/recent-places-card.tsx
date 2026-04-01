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
    <article className="rounded-[1.9rem] border border-border bg-white p-6 shadow-[0_16px_40px_rgba(32,24,16,0.05)] md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent">Recent Places</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Zuletzt gespeichert
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Deine neuesten Orte fuer schnellen Zugriff und Kartenkontext.
          </p>
        </div>
        <Link
          href="/places"
          className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-surface-strong"
        >
          Alle Places
        </Link>
      </div>

      {places.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-border bg-surface-strong p-5">
          <p className="font-semibold text-foreground">
            Noch keine Places vorhanden
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Speichere den ersten Ort, damit deine Karte und Timeline hier mit
            Leben gefuellt werden.
          </p>
          <Link
            href="/places"
            className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            Jetzt Place anlegen
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              className="block rounded-[1.5rem] border border-border bg-surface-strong p-5 transition hover:border-accent/30 hover:bg-white"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-foreground">
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
                <div className="text-sm font-semibold text-accent">
                  Place oeffnen
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
