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
      <article className="rounded-[2rem] border border-border bg-[#fcfaf7] p-6 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:p-7">
        <p className="eyebrow text-muted">Startpunkt</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Save your first place
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Ein Name und die Koordinaten reichen fuer den Anfang. Aus einem Ort
          wird spaeter ein vollwertiger Moment in Timeline, Karte und Trips.
        </p>

        <div className="mt-6 rounded-[1.6rem] border border-border bg-white p-5 md:p-6">
          <CreatePlaceForm action={createPlaceAction} />
        </div>
      </article>
    );
  }

  return (
    <section className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_44px_rgba(32,24,16,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Neuer Place</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Neuen Ort festhalten
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Die Liste bleibt im Blick. Neue Orte legst du bei Bedarf direkt im
            Dialog an, ohne aus deinem aktuellen Kontext zu fallen.
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
