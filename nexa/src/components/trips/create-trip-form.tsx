type CreateTripFormProps = {
  action: (formData: FormData) => Promise<void>;
};

export function CreateTripForm({ action }: CreateTripFormProps) {
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Titel</span>
          <input
            type="text"
            name="title"
            required
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Sommer in Portugal"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Region</span>
          <input
            type="text"
            name="region"
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
            name="country"
            className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            placeholder="Portugal"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Start</span>
            <input
              type="date"
              name="start_date"
              required
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Ende</span>
            <input
              type="date"
              name="end_date"
              required
              className="w-full rounded-[1rem] border border-border bg-surface-strong px-4 py-3 outline-none focus:border-accent"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
      >
        Trip speichern
      </button>
    </form>
  );
}
