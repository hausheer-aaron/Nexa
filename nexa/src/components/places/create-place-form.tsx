type CreatePlaceFormProps = {
  action: (formData: FormData) => Promise<void>;
};

export function CreatePlaceForm({ action }: CreatePlaceFormProps) {
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Miradouro Santa Luzia"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Adresse</span>
          <input
            type="text"
            name="address"
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
            name="latitude"
            required
            step="any"
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="38.7110"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Longitude</span>
          <input
            type="number"
            name="longitude"
            required
            step="any"
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="-9.1297"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Notiz</span>
        <textarea
          name="note"
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
            name="country_code"
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="PT"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Country Name</span>
          <input
            type="text"
            name="country_name"
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Portugal"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
      >
        Place speichern
      </button>
    </form>
  );
}
