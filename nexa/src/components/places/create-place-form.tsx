"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

type CreatePlaceFormProps = {
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
};

export function CreatePlaceForm({ action }: CreatePlaceFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [note, setNote] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !latitude || !longitude) {
      setError("Bitte Name, Latitude und Longitude ausfuellen.");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("address", address);
    formData.set("latitude", latitude);
    formData.set("longitude", longitude);
    formData.set("note", note);
    formData.set("country_code", countryCode);
    formData.set("country_name", countryName);

    setIsPending(true);

    startTransition(async () => {
      const result = await action(formData);

      if (result.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      setName("");
      setAddress("");
      setLatitude("");
      setLongitude("");
      setNote("");
      setCountryCode("");
      setCountryName("");
      setSuccess("Place erfolgreich gespeichert.");
      setIsPending(false);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Miradouro Santa Luzia"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Adresse</span>
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Rua do Limoeiro, Lisboa"
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
            required
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="38.7110"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Longitude</span>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            required
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="-9.1297"
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
          placeholder="Kurze Erinnerung zu diesem Ort"
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
            placeholder="PT"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Country Name</span>
          <input
            type="text"
            value={countryName}
            onChange={(event) => setCountryName(event.target.value)}
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Portugal"
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
        disabled={isPending}
        className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isPending ? "Speichere..." : "Place speichern"}
      </button>
    </form>
  );
}
