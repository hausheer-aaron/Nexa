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
      <article className="rounded-[2rem] border border-border bg-[#fcfaf7] p-6 shadow-[0_18px_44px_rgba(32,24,16,0.04)] md:p-7">
        <p className="eyebrow text-muted">Startpunkt</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Start your first trip
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Ein Titel und ein Zeitraum genuegen, um aus einem losen Gedanken ein
          neues Reisekapitel zu machen. Region und Land kannst du direkt
          mitgeben oder spaeter ergaenzen.
        </p>

        <div className="mt-6 rounded-[1.6rem] border border-border bg-white p-5 md:p-6">
          <CreateTripForm action={createTripAction} />
        </div>
      </article>
    );
  }

  return (
    <section className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_44px_rgba(32,24,16,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Neuer Trip</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Neues Kapitel anlegen
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Die Reiseuebersicht bleibt sichtbar. Wenn du einen neuen Trip
            brauchst, oeffnest du den Dialog und bleibst trotzdem im Kontext.
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
