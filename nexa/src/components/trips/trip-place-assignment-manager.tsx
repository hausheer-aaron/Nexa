"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  assignPlaceToTripFromTripAction,
  removePlaceFromTripAction,
} from "@/app/trips/[tripId]/place-actions";
import type { Place } from "@/types/entities";

type TripPlaceAssignmentManagerProps = {
  tripId: string;
  assignedPlaces: Place[];
  allPlaces: Place[];
};

export function TripPlaceAssignmentManager({
  tripId,
  assignedPlaces,
  allPlaces,
}: TripPlaceAssignmentManagerProps) {
  const router = useRouter();
  const assignedPlaceIds = useMemo(
    () => new Set(assignedPlaces.map((place) => place.id)),
    [assignedPlaces],
  );
  const availablePlaces = useMemo(
    () => allPlaces.filter((place) => !assignedPlaceIds.has(place.id)),
    [allPlaces, assignedPlaceIds],
  );
  const [placeId, setPlaceId] = useState(availablePlaces[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [removingPlaceId, setRemovingPlaceId] = useState<string | null>(null);

  function handleAssign(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!placeId) {
      setError("Waehle einen Place aus.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsAssigning(true);

    startTransition(async () => {
      const result = await assignPlaceToTripFromTripAction({ tripId, placeId });

      if (result.error) {
        setError(result.error);
        setIsAssigning(false);
        return;
      }

      setSuccess("Place erfolgreich zum Trip hinzugefuegt.");
      setPlaceId("");
      setIsAssigning(false);
      router.refresh();
    });
  }

  function handleRemove(placeToRemoveId: string) {
    setError(null);
    setSuccess(null);
    setRemovingPlaceId(placeToRemoveId);

    startTransition(async () => {
      const result = await removePlaceFromTripAction({
        tripId,
        placeId: placeToRemoveId,
      });

      if (result.error) {
        setError(result.error);
        setRemovingPlaceId(null);
        return;
      }

      setSuccess("Place erfolgreich aus dem Trip entfernt.");
      setRemovingPlaceId(null);
      router.refresh();
    });
  }

  return (
    <section className="rounded-[1.95rem] border border-black/8 bg-white/82 p-5 shadow-[0_16px_40px_rgba(32,24,16,0.05)] md:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="eyebrow text-accent">Trip Places</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Orte diesem Trip zuordnen
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Fuege bestehende Orte ueber eine einfache Auswahl hinzu und verwalte
            alle bereits zugeordneten Orte direkt darunter.
          </p>
        </div>

        <form
          onSubmit={handleAssign}
          className="w-full rounded-[1.55rem] border border-black/8 bg-[#faf7f1] p-4 lg:max-w-md"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              Place auswaehlen
            </span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={placeId}
                onChange={(event) => setPlaceId(event.target.value)}
                disabled={availablePlaces.length === 0 || isAssigning}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
              >
                {availablePlaces.length === 0 ? (
                  <option value="">Keine weiteren Places verfuegbar</option>
                ) : (
                  availablePlaces.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name}
                    </option>
                  ))
                )}
              </select>
              <button
                type="submit"
                disabled={availablePlaces.length === 0 || isAssigning}
                className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isAssigning ? "Speichere..." : "Place hinzufuegen"}
              </button>
            </div>
          </label>

          <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            <span className="rounded-full border border-black/8 bg-white px-3 py-1.5">
              {assignedPlaces.length} zugeordnet
            </span>
            <span className="rounded-full border border-black/8 bg-white px-3 py-1.5">
              {availablePlaces.length} verfuegbar
            </span>
          </div>
        </form>
      </div>

      {success ? (
        <p className="mt-4 rounded-[1rem] bg-accent-soft px-4 py-3 text-sm text-accent">
          {success}
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
          {error}
        </p>
      ) : null}

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-foreground">Aktuell zugeordnet</p>
          <p className="text-sm text-muted">
            {assignedPlaces.length === 0
              ? "Noch keine Orte"
              : `${assignedPlaces.length} ${assignedPlaces.length === 1 ? "Ort" : "Orte"}`}
          </p>
        </div>

        {assignedPlaces.length === 0 ? (
          <div className="mt-3 rounded-[1.55rem] border border-dashed border-black/10 bg-[#faf6f0] p-5 text-sm text-muted">
            Diesem Trip sind aktuell noch keine Places zugeordnet.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {assignedPlaces.map((place) => (
              <div
                key={place.id}
                className="rounded-[1.6rem] border border-black/8 bg-[#faf7f1] p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <Link
                      href={`/places/${place.id}`}
                      className="text-xl font-semibold tracking-tight text-foreground hover:text-accent"
                    >
                      {place.name}
                    </Link>
                    <p className="mt-2 text-sm text-muted">
                      {place.address || "Keine Adresse"}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {place.note || "Keine Notiz"}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <p className="font-mono text-xs text-muted">
                      {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemove(place.id)}
                      disabled={isAssigning || removingPlaceId === place.id}
                      className="rounded-full border border-[#c96a4f] px-4 py-2 text-sm font-semibold text-[#a04b31] disabled:opacity-60"
                    >
                      {removingPlaceId === place.id
                        ? "Entferne..."
                        : "Aus Trip entfernen"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
