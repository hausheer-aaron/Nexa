export default function AuthPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow text-accent">Auth</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Supabase Login ist als eigener Bereich reserviert
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Noch ohne echte Verbindung, aber mit klarer Stelle fuer Sign-in,
          Session-Handling und spaeteren User-spezifischen Datenzugriff.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[1.75rem] border border-border bg-white/62 p-6">
          <p className="eyebrow text-muted">Planned Flow</p>
          <ol className="mt-5 space-y-4 text-sm leading-6 text-muted">
            <li className="rounded-[1.5rem] bg-surface-strong p-4">
              1. E-Mail/Passwort ueber Supabase Auth erfassen
            </li>
            <li className="rounded-[1.5rem] bg-surface-strong p-4">
              2. Session im App-Layout oder Provider verfuegbar machen
            </li>
            <li className="rounded-[1.5rem] bg-surface-strong p-4">
              3. Nur eigene Trips und Places ueber RLS laden
            </li>
          </ol>
        </article>

        <article className="rounded-[1.75rem] border border-border bg-[#f6dfd0] p-6">
          <p className="eyebrow text-accent-warm">Database Alignment</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-foreground/80">
            <li>Profiles werden per Trigger aus `auth.users` gespiegelt.</li>
            <li>`trips`, `places` und `trip_places` passen bereits zur App-Idee.</li>
            <li>RLS trennt Benutzer sauber auf Datenbankebene.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
