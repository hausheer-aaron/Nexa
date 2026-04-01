import { PlacesList } from "@/components/places/places-list";
import { PlacesCreateSection } from "@/components/places/places-create-section";
import { getCurrentUserPlaces } from "@/services/placeService";

export default async function PlacesPage() {
  const places = await getCurrentUserPlaces();

  return (
    <div className="space-y-8 xl:space-y-10">
      <section className="rounded-[2rem] border border-border bg-white px-6 py-7 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:px-8 md:py-8">
        <p className="eyebrow text-accent">Places</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Deine Orte im Journal
        </h1>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            Gespeicherte Orte sind die Bausteine deines Travel Journals. Jeder
            Eintrag bleibt mit Koordinaten, Notizen und Reisekontext sofort
            wieder auffindbar.
          </p>
          <div className="rounded-full border border-border bg-surface-strong px-4 py-2 text-sm font-medium text-foreground/75">
            {places.length === 0
              ? "Noch keine Orte gespeichert"
              : `${places.length} ${places.length === 1 ? "Place" : "Places"} gespeichert`}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <PlacesCreateSection hasPlaces={places.length > 0} />

        <section className="space-y-4">
          <div>
            <p className="eyebrow text-muted">Place Liste</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Zuletzt erfasste Orte
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Springe direkt in Details, Notizen oder verknuepfte Trips und
              halte dein Journal in Bewegung.
            </p>
          </div>
          <PlacesList places={places} />
        </section>
      </section>
    </div>
  );
}
