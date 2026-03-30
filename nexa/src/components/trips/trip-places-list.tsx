import Link from "next/link";
import type { Place } from "@/types/entities";

type TripPlacesListProps = {
  places: Place[];
};

export function TripPlacesList({ places }: TripPlacesListProps) {
  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">Zugeordnete Places</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Orte in diesem Trip
      </h2>

      {places.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Diesem Trip sind aktuell noch keine Places zugeordnet.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              className="block rounded-[1.5rem] border border-border bg-surface-strong p-4 transition-colors hover:border-accent/35 hover:bg-white"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xl font-semibold tracking-tight">
                    {place.name}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {place.address || "Keine Adresse"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {place.note || "Keine Notiz"}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="font-mono text-xs text-muted">
                    {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                  </p>
                  <p className="mt-2 text-sm font-medium text-accent">
                    Place ansehen
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
