"use client";

import { CreateEntryModal } from "@/components/shared/create-entry-modal";
import { PlaceManagePanel } from "@/components/places/place-manage-panel";
import type { Place } from "@/types/entities";

type PlaceDetailActionsProps = {
  place: Place;
};

export function PlaceDetailActions({ place }: PlaceDetailActionsProps) {
  return (
    <section className="rounded-[1.9rem] border border-border bg-white p-6 shadow-[0_16px_40px_rgba(32,24,16,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Bearbeiten</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Ort aktualisieren
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Die Detailansicht bleibt bewusst read-only. Fuer Bearbeiten und
            Loeschen oeffnest du den Dialog und bleibst trotzdem im Kontext.
          </p>
        </div>

        <CreateEntryModal
          buttonLabel="Ort bearbeiten"
          eyebrow="Place Bearbeiten"
          title="Ort bearbeiten"
          description="Passe Name, Adresse, Koordinaten und Zusatzinfos an oder loesche den Place."
        >
          {({ closeModal }) => (
            <PlaceManagePanel place={place} onSuccess={closeModal} />
          )}
        </CreateEntryModal>
      </div>
    </section>
  );
}
