"use client";

import { CreateEntryModal } from "@/components/shared/create-entry-modal";
import { TripManagePanel } from "@/components/trips/trip-manage-panel";
import type { Trip } from "@/types/entities";

type TripDetailActionsProps = {
  trip: Trip;
};

export function TripDetailActions({ trip }: TripDetailActionsProps) {
  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Bearbeiten</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Trip Daten anpassen
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Die Detailansicht bleibt read-only. Bearbeitung und Loeschen liegen
            gesammelt im Dialog.
          </p>
        </div>

        <CreateEntryModal
          buttonLabel="Trip bearbeiten"
          eyebrow="Trip Bearbeiten"
          title="Trip bearbeiten"
          description="Passe Titel, Region, Land und Zeitraum an oder loesche den Trip."
        >
          {({ closeModal }) => (
            <TripManagePanel trip={trip} onSuccess={closeModal} />
          )}
        </CreateEntryModal>
      </div>
    </section>
  );
}
