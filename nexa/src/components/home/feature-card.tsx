type FeatureCardProps = {
  title: string;
  description: string;
  accent?: "green" | "warm";
};

export function FeatureCard({
  title,
  description,
  accent = "green",
}: FeatureCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border p-5 ${
        accent === "green"
          ? "border-accent/15 bg-accent-soft/65"
          : "border-accent-warm/20 bg-[#f6dfd0]"
      }`}
    >
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
