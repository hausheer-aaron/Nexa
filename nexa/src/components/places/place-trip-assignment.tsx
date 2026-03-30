"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { assignPlaceToTripAction } from "@/app/places/[placeId]/actions";
import type { Trip } from "@/types/entities";

type PlaceTripAssignmentProps = {
  placeId: string;
  allTrips: Trip[];
  assignedTrips: Trip[];
};

export function PlaceTripAssignment({
  placeId,
  allTrips,
  assignedTrips,
}: PlaceTripAssignmentProps) {
  const router = useRouter();
  const assignedTripIds = new Set(assignedTrips.map((trip) => trip.id));
  const availableTrips = allTrips.filter((trip) => !assignedTripIds.has(trip.id));
  const [tripId, setTripId] = useState(availableTrips[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!tripId) {
      setError("Waehle einen Trip aus.");
      return;
    }

    setError(null);
    setIsPending(true);

    startTransition(async () => {
      const result = await assignPlaceToTripAction({ placeId, tripId });

      if (result.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      setIsPending(false);
      setTripId("");
      router.refresh();
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">Trip Zuordnung</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Place einem Trip zuordnen
      </h2>

      <div className="mt-5">
        <p className="text-sm font-medium text-foreground">Bereits zugeordnet</p>
        {assignedTrips.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {assignedTrips.map((trip) => (
              <span
                key={trip.id}
                className="rounded-full bg-accent-soft px-3 py-2 text-sm font-semibold text-accent"
              >
                {trip.title}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Dieser Place ist aktuell noch keinem Trip zugeordnet.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Trip auswaehlen</span>
          <select
            value={tripId}
            onChange={(event) => setTripId(event.target.value)}
            disabled={availableTrips.length === 0 || isPending}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
          >
            {availableTrips.length === 0 ? (
              <option value="">Keine weiteren Trips verfuegbar</option>
            ) : (
              availableTrips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.title}
                </option>
              ))
            )}
          </select>
        </label>

        {error ? (
          <p className="rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={availableTrips.length === 0 || isPending}
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isPending ? "Speichere..." : "Trip zuordnen"}
        </button>
      </form>
    </section>
  );
}
