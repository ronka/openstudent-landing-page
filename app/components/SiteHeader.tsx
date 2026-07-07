import Link from "next/link";
import Wordmark from "./Wordmark";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" aria-label="אופן סטודנט — דף הבית">
          <Wordmark />
        </Link>

        <nav className="flex items-center gap-1 text-[0.95rem] font-medium text-muted sm:gap-2">
          <Link
            href="/#features"
            className="hidden rounded-lg px-3 py-2 transition-colors hover:text-ink sm:inline-block"
          >
            תכונות
          </Link>
          <Link
            href="/#screens"
            className="hidden rounded-lg px-3 py-2 transition-colors hover:text-ink sm:inline-block"
          >
            תצוגה
          </Link>
          <Link
            href="/support"
            className="rounded-lg px-3 py-2 transition-colors hover:text-ink"
          >
            תמיכה
          </Link>
          <Link
            href="/#download"
            className="rounded-xl bg-ink px-4 py-2 text-white transition-transform hover:-translate-y-0.5"
          >
            הורדה
          </Link>
        </nav>
      </div>
    </header>
  );
}
