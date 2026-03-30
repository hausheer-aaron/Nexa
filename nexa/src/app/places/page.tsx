import { createPlaceAction } from "@/app/places/actions";
import { CreatePlaceForm } from "@/components/places/create-place-form";
import { PlacesList } from "@/components/places/places-list";
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

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-muted">Neuer Place</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Ort anlegen
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Name, Koordinaten und optionale Zusatzinfos reichen fuer den ersten
            Schritt.
          </p>

          <div className="mt-6">
            <CreatePlaceForm action={createPlaceAction} />
          </div>
        </article>

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
