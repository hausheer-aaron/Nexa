import { PlacesMapShell } from "@/components/map/places-map-shell";
import { getCurrentUserPlaces } from "@/services/placeService";

export default async function MapPage() {
  const places = await getCurrentUserPlaces();

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-accent">Map</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Kartenansicht deiner Places
          </h1>
        </div>
        <div className="rounded-[1.5rem] border border-border bg-white/60 px-4 py-3 text-sm text-muted">
          Marker aus Supabase, Klick-Auswahl und direktes Speichern
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-border bg-[#dbe8df] p-6">
          <div className="rounded-[1.5rem] border border-accent/15 bg-white/45 p-3">
            <PlacesMapShell places={places} />
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-accent">Places auf der Karte</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Alle Orte des eingeloggten Users werden als Marker angezeigt. Klick
            auf einen Marker zeigt die Basisinfos direkt in der Karte. Klick
            auf die Karte setzt zusaetzlich einen temporaeren Auswahlpunkt, den
            du direkt als neuen Place speichern kannst.
          </p>

          <div className="mt-5 space-y-4">
            {places.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-border bg-surface-strong p-4 text-sm text-muted">
                Noch keine Places vorhanden. Lege zuerst Orte an, damit Marker
                auf der Karte erscheinen.
              </div>
            ) : (
              places.map((place) => (
                <div
                  key={place.id}
                  className="rounded-[1.5rem] border border-border bg-surface-strong p-4"
                >
                  <p className="font-semibold">{place.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {place.address || "Keine Adresse"}
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                  </p>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
