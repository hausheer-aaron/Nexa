type DashboardStatCardProps = {
  label: string;
  value: number;
  detail: string;
};

export function DashboardStatCard({
  label,
  value,
  detail,
}: DashboardStatCardProps) {
  return (
    <article className="rounded-[1.4rem] border border-black/7 bg-white/72 px-4 py-4">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
    </article>
  );
}
