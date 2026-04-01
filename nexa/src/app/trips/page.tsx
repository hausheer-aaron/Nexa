import { TripsList } from "@/components/trips/trips-list";
import { TripsCreateSection } from "@/components/trips/trips-create-section";
import { getCurrentUserTrips } from "@/services/tripService";

export default async function TripsPage() {
  const trips = await getCurrentUserTrips();

  return (
    <div className="space-y-8 xl:space-y-10">
      <section className="rounded-[2rem] border border-border bg-white px-6 py-7 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:px-8 md:py-8">
        <p className="eyebrow text-accent">Trips</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Deine Reiseuebersicht
        </h1>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            Halte Reisen als klare Kapitel fest. Statt einer technischen Liste
            siehst du hier deine Trips als Einstiegspunkte fuer Orte, Route und
            Erinnerungen.
          </p>
          <div className="rounded-full border border-border bg-surface-strong px-4 py-2 text-sm font-medium text-foreground/75">
            {trips.length === 0
              ? "Noch keine Reisen angelegt"
              : `${trips.length} ${trips.length === 1 ? "Trip" : "Trips"} gespeichert`}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <TripsCreateSection hasTrips={trips.length > 0} />

        <section className="space-y-4">
          <div>
            <p className="eyebrow text-muted">Trip Liste</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Reise Kapitel
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Oeffne einen Trip, um Orte zuzuordnen, die Route zu sehen oder
              Metadaten spaeter im Dialog anzupassen.
            </p>
          </div>
          <TripsList trips={trips} />
        </section>
      </section>
    </div>
  );
}
