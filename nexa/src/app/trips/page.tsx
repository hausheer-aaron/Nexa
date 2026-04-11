import { TripsList } from "@/components/trips/trips-list";
import { TripsCreateSection } from "@/components/trips/trips-create-section";
import { getCurrentUserTrips } from "@/services/tripService";

export default async function TripsPage() {
  const trips = await getCurrentUserTrips();

  return (
    <div className="space-y-6 md:space-y-8 xl:space-y-10">
      <section className="overflow-hidden rounded-[2.2rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(248,243,235,0.9))] px-5 py-6 shadow-[0_28px_80px_rgba(32,24,16,0.08)] sm:px-6 md:px-8 md:py-8 xl:px-10 xl:py-9">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-accent">Trips</p>
              <span className="rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-xs font-medium text-muted">
                Reisekapitel
              </span>
            </div>
            <h1 className="max-w-4xl text-[2.45rem] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl xl:text-[4.4rem] xl:leading-[1.02]">
              Deine Reiseuebersicht,
              <span className="block text-foreground/72">
                klar strukturiert und sofort griffbereit.
              </span>
            </h1>
            <p className="max-w-3xl text-[0.98rem] leading-7 text-muted md:text-lg">
              Halte Reisen als klare Kapitel fest. Statt einer technischen
              Liste siehst du hier deine Trips als Einstiegspunkte fuer Orte,
              Route und Erinnerungen.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 xl:items-end">
            <TripsCreateSection />
            <div className="rounded-[1.7rem] border border-black/8 bg-white/72 px-5 py-4 xl:max-w-[240px]">
              <p className="text-sm text-muted">Aktueller Stand</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {trips.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {trips.length === 0
                  ? "Noch keine Reisen angelegt."
                  : `${trips.length} ${trips.length === 1 ? "Trip" : "Trips"} im Journal gespeichert.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TripsList trips={trips} />
    </div>
  );
}
