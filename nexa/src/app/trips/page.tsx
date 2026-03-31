import { TripsList } from "@/components/trips/trips-list";
import { TripsCreateSection } from "@/components/trips/trips-create-section";
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

      <section className="space-y-6">
        <TripsCreateSection hasTrips={trips.length > 0} />

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
