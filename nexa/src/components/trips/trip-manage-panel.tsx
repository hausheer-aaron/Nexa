"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTripAction, updateTripAction } from "@/app/trips/[tripId]/manage-actions";
import type { Trip } from "@/types/entities";

type TripManagePanelProps = {
  trip: Trip;
  onSuccess?: () => void;
};

export function TripManagePanel({ trip, onSuccess }: TripManagePanelProps) {
  const router = useRouter();
  const [title, setTitle] = useState(trip.title);
  const [region, setRegion] = useState(trip.region ?? "");
  const [country, setCountry] = useState(trip.country ?? "");
  const [startDate, setStartDate] = useState(trip.start_date);
  const [endDate, setEndDate] = useState(trip.end_date);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !startDate || !endDate) {
      setError("Titel, Startdatum und Enddatum sind erforderlich.");
      return;
    }

    setIsSaving(true);

    startTransition(async () => {
      const result = await updateTripAction({
        tripId: trip.id,
        title,
        region,
        country,
        start_date: startDate,
        end_date: endDate,
      });

      if (result.error) {
        setError(result.error);
        setIsSaving(false);
        return;
      }

      setSuccess("Trip erfolgreich gespeichert.");
      setIsSaving(false);
      onSuccess?.();
      router.refresh();
    });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Willst du diesen Trip wirklich loeschen?",
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);
    setIsDeleting(true);

    startTransition(async () => {
      const result = await deleteTripAction(trip.id);

      if (result.error) {
        setError(result.error);
        setIsDeleting(false);
        return;
      }

      router.replace("/trips");
      router.refresh();
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">Trip Bearbeiten</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Daten anpassen oder loeschen
      </h2>

      <form onSubmit={handleSave} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Titel</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Region</span>
            <input
              type="text"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Land</span>
            <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Start</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                required
                className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Ende</span>
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                required
                className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>

        {success ? (
          <p className="rounded-[1rem] bg-accent-soft px-4 py-3 text-sm text-accent">
            {success}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSaving ? "Speichere..." : "Aenderungen speichern"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isSaving || isDeleting}
            className="rounded-full border border-[#c96a4f] px-5 py-3 text-sm font-semibold text-[#a04b31] disabled:opacity-60"
          >
            {isDeleting ? "Loesche..." : "Trip loeschen"}
          </button>
        </div>
      </form>
    </section>
  );
}
