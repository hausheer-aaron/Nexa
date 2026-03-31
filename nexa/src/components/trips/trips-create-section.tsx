"use client";

import { createTripAction } from "@/app/trips/actions";
import { CreateEntryModal } from "@/components/shared/create-entry-modal";
import { CreateTripForm } from "@/components/trips/create-trip-form";

type TripsCreateSectionProps = {
  hasTrips: boolean;
};

export function TripsCreateSection({ hasTrips }: TripsCreateSectionProps) {
  if (!hasTrips) {
    return (
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
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Neuer Trip</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Reisen verwalten
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Die Liste bleibt sichtbar. Neue Trips legst du bei Bedarf direkt im
            Dialog an.
          </p>
        </div>

        <CreateEntryModal
          buttonLabel="Neuen Trip erstellen"
          eyebrow="Neuer Trip"
          title="Reise anlegen"
          description="Titel, Region, Land und Zeitraum reichen fuer den ersten Schritt."
        >
          {({ closeModal }) => (
            <CreateTripForm action={createTripAction} onSuccess={closeModal} />
          )}
        </CreateEntryModal>
      </div>
    </section>
  );
}
