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
    <article className="rounded-[1.5rem] border border-border bg-white px-5 py-5 shadow-[0_10px_28px_rgba(32,24,16,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
    </article>
  );
}
