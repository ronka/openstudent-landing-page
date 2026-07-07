/** Consistent readable wrapper for the privacy / terms / support prose pages. */
export default function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <header className="border-b border-black/[0.08] pb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
        {updated && (
          <p className="mt-4 text-sm text-muted">עודכן לאחרונה: {updated}</p>
        )}
      </header>

      <div
        className="mt-10 space-y-8 leading-relaxed text-ink/90
          [&_a]:font-medium [&_a]:text-brand-dark [&_a]:underline [&_a]:underline-offset-2
          [&_h2]:mt-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink
          [&_h2]:mb-3
          [&_li]:mb-1.5
          [&_p]:mb-3
          [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pr-6"
      >
        {children}
      </div>
    </div>
  );
}
