"use client";

import { createPlaceAction } from "@/app/places/actions";
import { CreatePlaceForm } from "@/components/places/create-place-form";
import { CreateEntryModal } from "@/components/shared/create-entry-modal";

type PlacesCreateSectionProps = {
  hasPlaces: boolean;
};

export function PlacesCreateSection({ hasPlaces }: PlacesCreateSectionProps) {
  if (!hasPlaces) {
    return (
      <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
        <p className="eyebrow text-muted">Neuer Place</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Ort anlegen
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Name, Koordinaten und optionale Zusatzinfos reichen fuer den ersten
          Schritt.
        </p>

        <div className="mt-6">
          <CreatePlaceForm action={createPlaceAction} />
        </div>
      </article>
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Neuer Place</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Orte verwalten
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Die Liste bleibt sichtbar. Neue Places legst du bei Bedarf direkt
            im Dialog an.
          </p>
        </div>

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
      </div>
    </section>
  );
}
