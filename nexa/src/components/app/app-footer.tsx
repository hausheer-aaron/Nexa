export function AppFooter() {
  return (
    <footer className="w-full px-4 pb-5 md:px-6 md:pb-6 xl:px-10">
      <div className="flex flex-col gap-2 border-t border-black/8 px-1 pt-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Nexa</p>
        <p className="font-mono text-xs tracking-[0.18em] text-foreground/70">
          v0.1.0-beta
        </p>
      </div>
    </footer>
  );
}
