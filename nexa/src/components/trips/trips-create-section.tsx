"use client";

import { createTripAction } from "@/app/trips/actions";
import { CreateEntryModal } from "@/components/shared/create-entry-modal";
import { CreateTripForm } from "@/components/trips/create-trip-form";

export function TripsCreateSection() {
  return (
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
  );
}
