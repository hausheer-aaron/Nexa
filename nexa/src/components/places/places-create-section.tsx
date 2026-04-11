"use client";

import { createPlaceAction } from "@/app/places/actions";
import { CreatePlaceForm } from "@/components/places/create-place-form";
import { CreateEntryModal } from "@/components/shared/create-entry-modal";

export function PlacesCreateSection() {
  return (
    <CreateEntryModal
      buttonLabel="Neuen Place erstellen"
      eyebrow="Neuer Place"
      title="Ort anlegen"
      description="Name, Koordinaten und optionale Zusatzinfos reichen fuer den ersten Schritt."
    >
      {({ closeModal }) => (
        <CreatePlaceForm action={createPlaceAction} onSuccess={closeModal} />
      )}
    </CreateEntryModal>
  );
}
