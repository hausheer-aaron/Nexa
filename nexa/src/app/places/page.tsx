import { PlacesList } from "@/components/places/places-list";
import { PlacesCreateSection } from "@/components/places/places-create-section";
import { getCurrentUserPlaces } from "@/services/placeService";

export default async function PlacesPage() {
  const places = await getCurrentUserPlaces();

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Places</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Deine Places
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Hier siehst du alle Places des aktuell eingeloggten Users und kannst
          neue Orte direkt anlegen.
        </p>
      </section>

      <section className="space-y-6">
        <PlacesCreateSection hasPlaces={places.length > 0} />

        <section className="space-y-4">
          <div>
            <p className="eyebrow text-muted">Place Liste</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Gespeicherte Orte
            </h2>
          </div>
          <PlacesList places={places} />
        </section>
      </section>
    </div>
  );
}
