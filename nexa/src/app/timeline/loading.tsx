export default function TimelineLoading() {
  return (
    <div className="space-y-6">
      <section>
        <div className="h-4 w-20 rounded-full bg-black/8" />
        <div className="mt-3 h-10 w-72 rounded-full bg-black/8" />
        <div className="mt-3 h-4 w-96 rounded-full bg-black/8" />
      </section>

      <section className="space-y-4">
        <div className="h-10 w-52 rounded-full bg-black/8" />
        <div className="h-40 rounded-[1.75rem] border border-border bg-white/62" />
        <div className="h-40 rounded-[1.75rem] border border-border bg-white/62" />
      </section>
    </div>
  );
}
