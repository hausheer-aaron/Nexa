"use client";

import { CreateEntryModal } from "@/components/shared/create-entry-modal";
import { TripManagePanel } from "@/components/trips/trip-manage-panel";
import type { Trip } from "@/types/entities";

type TripDetailActionsProps = {
  trip: Trip;
};

export function TripDetailActions({ trip }: TripDetailActionsProps) {
  return (
    <section className="rounded-[1.9rem] border border-border bg-white p-6 shadow-[0_16px_40px_rgba(32,24,16,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Bearbeiten</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Trip aktualisieren
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Die Detailansicht bleibt bewusst ruhig. Aenderungen und Loeschen
            bleiben gesammelt im Dialog, damit Inhalt und Bearbeitung getrennt
            bleiben.
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
