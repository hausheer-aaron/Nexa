import { CreateTripForm } from "@/components/trips/create-trip-form";
import { TripsList } from "@/components/trips/trips-list";
import { createTripAction } from "@/app/trips/actions";
import { getCurrentUserTrips } from "@/services/tripService";

export default async function TripsPage() {
  const trips = await getCurrentUserTrips();

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Trips</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Deine Trips
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Hier siehst du alle Trips des aktuell eingeloggten Users und kannst
          neue Reisen direkt anlegen.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-muted">Neuer Trip</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Reise anlegen
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Titel, Region, Land und Zeitraum reichen fuer den ersten Schritt.
          </p>

          <div className="mt-6">
            <CreateTripForm action={createTripAction} />
          </div>
        </article>

        <section className="space-y-4">
          <div>
            <p className="eyebrow text-muted">Trip Liste</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Vorhandene Reisen
            </h2>
          </div>
          <TripsList trips={trips} />
        </section>
      </section>
    </div>
  );
}
