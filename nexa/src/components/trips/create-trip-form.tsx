"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

type CreateTripFormProps = {
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
};

export function CreateTripForm({ action }: CreateTripFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !startDate || !endDate) {
      setError("Bitte Titel, Startdatum und Enddatum ausfuellen.");
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("region", region);
    formData.set("country", country);
    formData.set("start_date", startDate);
    formData.set("end_date", endDate);

    setIsPending(true);

    startTransition(async () => {
      const result = await action(formData);

      if (result.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      setTitle("");
      setRegion("");
      setCountry("");
      setStartDate("");
      setEndDate("");
      setSuccess("Trip erfolgreich gespeichert.");
      setIsPending(false);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Titel</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Sommer in Portugal"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Region</span>
          <input
            type="text"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Algarve"
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
            placeholder="Portugal"
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
        disabled={isPending}
        className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isPending ? "Speichere..." : "Trip speichern"}
      </button>
    </form>
  );
}
