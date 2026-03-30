import { milestones } from "@/data/mock-data";

const statusStyles = {
  done: "bg-accent text-white",
  next: "bg-accent-warm text-white",
  later: "bg-black/8 text-foreground",
};

export function MilestoneList() {
  return (
    <div className="space-y-3">
      {milestones.map((milestone) => (
        <article
          key={milestone.id}
          className="rounded-[1.5rem] border border-border bg-white/60 p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">{milestone.title}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                statusStyles[milestone.status]
              }`}
            >
              {milestone.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            {milestone.description}
          </p>
        </article>
      ))}
    </div>
  );
}
