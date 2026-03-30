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
    <article className="rounded-[1.5rem] border border-border bg-white/62 p-5">
      <p className="eyebrow text-muted">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
    </article>
  );
}
