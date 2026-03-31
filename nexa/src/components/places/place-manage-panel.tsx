"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { deletePlaceAction, updatePlaceAction } from "@/app/places/[placeId]/manage-actions";
import type { Place } from "@/types/entities";

type PlaceManagePanelProps = {
  place: Place;
  onSuccess?: () => void;
};

export function PlaceManagePanel({ place, onSuccess }: PlaceManagePanelProps) {
  const router = useRouter();
  const [name, setName] = useState(place.name);
  const [address, setAddress] = useState(place.address ?? "");
  const [note, setNote] = useState(place.note ?? "");
  const [latitude, setLatitude] = useState(String(place.latitude));
  const [longitude, setLongitude] = useState(String(place.longitude));
  const [countryCode, setCountryCode] = useState(place.country_code ?? "");
  const [countryName, setCountryName] = useState(place.country_name ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Name ist erforderlich.");
      return;
    }

    setIsSaving(true);

    startTransition(async () => {
      const result = await updatePlaceAction({
        placeId: place.id,
        name,
        address,
        note,
        latitude: Number(latitude),
        longitude: Number(longitude),
        country_code: countryCode,
        country_name: countryName,
      });

      if (result.error) {
        setError(result.error);
        setIsSaving(false);
        return;
      }

      setSuccess("Place erfolgreich gespeichert.");
      setIsSaving(false);
      onSuccess?.();
      router.refresh();
    });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Willst du diesen Place wirklich loeschen?",
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);
    setIsDeleting(true);

    startTransition(async () => {
      const result = await deletePlaceAction(place.id);

      if (result.error) {
        setError(result.error);
        setIsDeleting(false);
        return;
      }

      router.replace("/places");
      router.refresh();
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-border bg-white/62 p-6">
      <p className="eyebrow text-accent">Place Bearbeiten</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Daten anpassen oder loeschen
      </h2>

      <form onSubmit={handleSave} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Adresse</span>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Latitude</span>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Longitude</span>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Notiz</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Country Code</span>
            <input
              type="text"
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Country Name</span>
            <input
              type="text"
              value={countryName}
              onChange={(event) => setCountryName(event.target.value)}
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>
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
            {isDeleting ? "Loesche..." : "Place loeschen"}
          </button>
        </div>
      </form>
    </section>
  );
}
