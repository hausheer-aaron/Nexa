export default function TripsLoading() {
  return (
    <div className="space-y-6">
      <section>
        <div className="h-4 w-20 rounded-full bg-black/8" />
        <div className="mt-3 h-10 w-56 rounded-full bg-black/8" />
        <div className="mt-3 h-4 w-80 rounded-full bg-black/8" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <div className="h-6 w-36 rounded-full bg-black/8" />
          <div className="mt-6 space-y-4">
            <div className="h-12 rounded-[1rem] bg-black/8" />
            <div className="h-12 rounded-[1rem] bg-black/8" />
            <div className="h-12 rounded-[1rem] bg-black/8" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-28 rounded-[1.75rem] border border-border bg-white/62" />
          <div className="h-28 rounded-[1.75rem] border border-border bg-white/62" />
        </div>
      </section>
    </div>
  );
}
