import { PlacesMapShell } from "@/components/map/places-map-shell";
import { getCurrentUserPlaces } from "@/services/placeService";

export default async function MapPage() {
  const places = await getCurrentUserPlaces();

  return (
    <div className="space-y-8 xl:space-y-10">
      <section className="rounded-[2rem] border border-border bg-white px-6 py-7 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:px-8 md:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-accent">Map</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Explore your places
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              Nutze die Karte als explorativen Einstieg in dein Journal. Marker
              zeigen bestehende Orte, ein Klick auf die Karte setzt direkt den
              naechsten gespeicherten Punkt.
            </p>
          </div>
          <div className="rounded-full border border-border bg-surface-strong px-4 py-2 text-sm font-medium text-foreground/75">
            {places.length === 0
              ? "Noch keine Marker vorhanden"
              : `${places.length} Marker sichtbar`}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        <article className="rounded-[2rem] border border-border bg-[#eef5f1] p-4 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:p-5">
          <div className="rounded-[1.7rem] border border-accent/10 bg-white p-3">
            <PlacesMapShell places={places} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_44px_rgba(32,24,16,0.04)]">
          <p className="eyebrow text-accent">Map Journal</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Orte im aktuellen Blickfeld
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Marker bleiben bewusst einfach. Oeffne einen Marker fuer Basisinfos
            oder setze einen neuen Punkt direkt auf der Karte.
          </p>

          <div className="mt-5 space-y-4">
            {places.length === 0 ? (
              <div className="rounded-[1.6rem] border border-dashed border-border bg-[#fbfaf7] p-5 text-center">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  Add your first place
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Sobald du einen Ort speicherst, wird er hier als Marker und in
                  deiner Timeline sichtbar.
                </p>
              </div>
            ) : (
              places.map((place) => (
                <div
                  key={place.id}
                  className="rounded-[1.6rem] border border-border bg-surface-strong p-4"
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
