import { PlacesList } from "@/components/places/places-list";
import { PlacesCreateSection } from "@/components/places/places-create-section";
import { getCurrentUserPlaces } from "@/services/placeService";

export default async function PlacesPage() {
  const places = await getCurrentUserPlaces();

  return (
    <div className="space-y-6 md:space-y-8 xl:space-y-10">
      <section className="overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(248,243,235,0.9))] px-5 py-6 shadow-[0_28px_80px_rgba(32,24,16,0.08)] sm:px-6 md:px-8 md:py-8 xl:px-10 xl:py-9">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-accent">Places</p>
              <span className="rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-xs font-medium text-muted">
                Orte im Journal
              </span>
            </div>
            <h1 className="max-w-4xl text-[2.45rem] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl xl:text-[4.4rem] xl:leading-[1.02]">
              Deine Orte,
              <span className="block text-foreground/72">
                sauber gesammelt und sofort im Kontext.
              </span>
            </h1>
            <p className="max-w-3xl text-[0.98rem] leading-7 text-muted md:text-lg">
              Gespeicherte Orte sind die Bausteine deines Travel Journals.
              Jeder Eintrag bleibt mit Koordinaten, Notizen und Reisekontext
              sofort wieder auffindbar.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 xl:items-end">
            <PlacesCreateSection />
            <div className="rounded-[1.7rem] border border-black/8 bg-white/72 px-5 py-4 xl:max-w-[240px]">
              <p className="text-sm text-muted">Aktueller Stand</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {places.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {places.length === 0
                  ? "Noch keine Orte gespeichert."
                  : `${places.length} ${places.length === 1 ? "Place" : "Places"} im Journal gespeichert.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PlacesList places={places} />
    </div>
  );
}
