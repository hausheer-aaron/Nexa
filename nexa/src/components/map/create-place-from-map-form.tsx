"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { createPlaceFromMapAction } from "@/app/map/actions";
import type { SelectedMapPoint } from "@/components/map/places-map";
import { getReverseGeocodingSuggestion } from "@/lib/geocoding/reverse-geocoding";

type CreatePlaceFromMapFormProps = {
  selectedPoint: SelectedMapPoint | null;
  onSaved: () => void;
};

export function CreatePlaceFromMapForm({
  selectedPoint,
  onSaved,
}: CreatePlaceFromMapFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(Boolean(selectedPoint));
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPoint) {
      return;
    }

    let isCancelled = false;

    void getReverseGeocodingSuggestion(
      selectedPoint.latitude,
      selectedPoint.longitude,
    )
      .then((suggestion) => {
        if (isCancelled) {
          return;
        }

        if (!suggestion) {
          setGeocodingError(
            "Keine Ortsinfos gefunden. Du kannst den Place manuell erfassen.",
          );
          setIsGeocoding(false);
          return;
        }

        setName(suggestion.name);
        setAddress(suggestion.address);
        setCountryCode(suggestion.countryCode);
        setCountryName(suggestion.countryName);
        setGeocodingError(null);
        setIsGeocoding(false);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setGeocodingError(
          "Ortsinfos konnten nicht geladen werden. Du kannst den Place manuell erfassen.",
        );
        setIsGeocoding(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedPoint]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPoint) {
      setError("Waehle zuerst einen Punkt auf der Karte.");
      return;
    }

    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Name ist erforderlich.");
      return;
    }

    setIsPending(true);

    startTransition(async () => {
      const result = await createPlaceFromMapAction({
        name,
        note,
        address,
        country_code: countryCode,
        country_name: countryName,
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      });

      if (result.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      setName("");
      setAddress("");
      setNote("");
      setCountryCode("");
      setCountryName("");
      setSuccess("Place erfolgreich aus der Karte gespeichert.");
      setIsPending(false);
      onSaved();
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="eyebrow text-accent">Place speichern</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Halte den aktuell ausgewaehlten Kartenpunkt direkt als neuen Ort in
          deinem Journal fest.
        </p>
      </div>

      {isGeocoding ? (
        <p className="rounded-[1rem] bg-white/70 px-4 py-3 text-sm text-muted">
          Ortsinfos werden fuer den ausgewaehlten Punkt geladen...
        </p>
      ) : null}

      {geocodingError ? (
        <p className="rounded-[1rem] bg-white/70 px-4 py-3 text-sm text-muted">
          {geocodingError}
        </p>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Name</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          disabled={!selectedPoint || isPending}
          className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
          placeholder="Neuer Aussichtspunkt"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Adresse</span>
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={!selectedPoint || isPending}
          className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
          placeholder="Wird automatisch vorgeschlagen"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Notiz</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
          disabled={!selectedPoint || isPending}
          className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
          placeholder="Optionale Erinnerung zu diesem Ort"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Country Code</span>
          <input
            type="text"
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value)}
            disabled={!selectedPoint || isPending}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
            placeholder="Wird automatisch vorgeschlagen"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Country Name</span>
          <input
            type="text"
            value={countryName}
            onChange={(event) => setCountryName(event.target.value)}
            disabled={!selectedPoint || isPending}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent disabled:opacity-60"
            placeholder="Wird automatisch vorgeschlagen"
          />
        </label>
      </div>

      {error ? (
        <p className="rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-[1rem] bg-accent-soft px-4 py-3 text-sm text-accent">
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!selectedPoint || isPending}
        className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isPending ? "Speichere..." : "Place speichern"}
      </button>
    </form>
  );
}
