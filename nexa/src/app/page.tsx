import Link from "next/link";
import { FeatureCard } from "@/components/home/feature-card";
import { MilestoneList } from "@/components/home/milestone-list";
import { dashboardStats, places, trips } from "@/data/mock-data";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border bg-[linear-gradient(135deg,rgba(31,107,87,0.95),rgba(23,49,43,0.92))] p-6 text-white md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/65">Project Foundation</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Nexa statt Standard-Next-Template.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/78 md:text-lg">
              Die Grundstruktur ist auf deine App-Idee ausgerichtet: Orte,
              Trips, Kartenfokus und spaetere Supabase-Anbindung.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {dashboardStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-white/12 bg-white/8 p-4"
              >
                <p className="eyebrow text-white/55">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-white/70">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid">
        <FeatureCard
          title="Map-first Einstieg"
          description="Eigene Route `/map` als Ausgangspunkt fuer Suche, Pins, GPS und spaeteren Kartenanbieter."
        />
        <FeatureCard
          title="Supabase-ready Datenmodell"
          description="Trips, Places und Many-to-many-Zuordnung sind bereits in Types und Beispiel-Daten gespiegelt."
          accent="warm"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">Current Scope</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Erste Domaenen statt UI-Demo
              </h2>
            </div>
            <Link
              href="/trips"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-accent/40 hover:bg-white"
            >
              Trips ansehen
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-surface-strong p-5">
              <p className="eyebrow text-muted">Trips</p>
              <div className="mt-4 space-y-4">
                {trips.map((trip) => (
                  <div key={trip.id}>
                    <p className="text-lg font-semibold">{trip.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {trip.startDate} - {trip.endDate}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {trip.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-surface-strong p-5">
              <p className="eyebrow text-muted">Places</p>
              <div className="mt-4 space-y-4">
                {places.map((place) => (
                  <div key={place.id}>
                    <p className="text-lg font-semibold">{place.name}</p>
                    <p className="mt-1 text-sm text-muted">{place.address}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {place.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-accent">Milestones</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Sinnvolle naechste Ausbaustufen
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
            Noch ohne echte Backend-Anbindung, aber mit einer Struktur, die
            sich direkt in die Supabase-Tabellen und spaeteren Flows uebertragen
            laesst.
          </p>
          <div className="mt-6">
            <MilestoneList />
          </div>
        </article>
      </section>
    </div>
  );
}
