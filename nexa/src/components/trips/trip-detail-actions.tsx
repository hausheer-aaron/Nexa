"use client";

import { CreateEntryModal } from "@/components/shared/create-entry-modal";
import { TripManagePanel } from "@/components/trips/trip-manage-panel";
import type { Trip } from "@/types/entities";

type TripDetailActionsProps = {
  trip: Trip;
  compact?: boolean;
};

export function TripDetailActions({
  trip,
  compact = false,
}: TripDetailActionsProps) {
  if (compact) {
    return (
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
    );
  }

  return (
    <section className="rounded-[1.9rem] border border-black/8 bg-white/78 p-5 shadow-[0_16px_40px_rgba(32,24,16,0.05)] md:p-6">
      <div className="space-y-4">
        <div>
          <p className="eyebrow text-muted">Bearbeiten</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Trip aktualisieren
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Passe Stammdaten an oder loesche den Trip gesammelt im Dialog.
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
