"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { createPlaceFromMapAction } from "@/app/map/actions";
import type { SelectedMapPoint } from "@/components/map/places-map";

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
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPoint) {
      setError("Waehle zuerst einen Punkt auf der Karte.");
      return;
    }

    setError(null);
    setIsPending(true);

    startTransition(async () => {
      const result = await createPlaceFromMapAction({
        name,
        note,
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      });

      if (result.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      setName("");
      setNote("");
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
          Speichert den aktuell ausgewaehlten Kartenpunkt als neuen Place.
        </p>
      </div>

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

      {error ? (
        <p className="rounded-[1rem] bg-[#f6dfd0] px-4 py-3 text-sm text-[#7a4122]">
          {error}
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
