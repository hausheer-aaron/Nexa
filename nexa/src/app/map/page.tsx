import { places } from "@/data/mock-data";

export default function MapPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-accent">Map</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Kartenbereich als naechster Funktionskern
          </h1>
        </div>
        <div className="rounded-[1.5rem] border border-border bg-white/60 px-4 py-3 text-sm text-muted">
          Platzhalter fuer Suche, Koordinaten-Eingabe und GPS-Aktivierung
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-border bg-[#dbe8df] p-6">
          <div className="flex h-[420px] flex-col justify-between rounded-[1.5rem] border border-accent/15 bg-[linear-gradient(160deg,#eef6f1_0%,#d8ece4_45%,#c1dfd2_100%)] p-6">
            <div className="max-w-sm">
              <p className="eyebrow text-accent">Future Map Canvas</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Hier kommt spaeter die interaktive Karte hin.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Die Section ist bewusst schon als Hauptflaeche reserviert, damit
                der spaetere Kartenwechsel nicht die gesamte Seite umwerfen muss.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.25rem] bg-white/65 p-4">
                <p className="eyebrow text-muted">Search</p>
                <p className="mt-2 font-semibold">Ort, Adresse, Koordinaten</p>
              </div>
              <div className="rounded-[1.25rem] bg-white/65 p-4">
                <p className="eyebrow text-muted">Selection</p>
                <p className="mt-2 font-semibold">Pin preview + speichern</p>
              </div>
              <div className="rounded-[1.25rem] bg-white/65 p-4">
                <p className="eyebrow text-muted">Location</p>
                <p className="mt-2 font-semibold">GPS optional aktivierbar</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-accent">Recent Saved Places</p>
          <div className="mt-5 space-y-4">
            {places.map((place) => (
              <div
                key={place.id}
                className="rounded-[1.5rem] border border-border bg-surface-strong p-4"
              >
                <p className="font-semibold">{place.name}</p>
                <p className="mt-1 text-sm text-muted">{place.address}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
