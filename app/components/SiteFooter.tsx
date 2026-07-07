import Link from "next/link";
import Wordmark from "./Wordmark";

const CONTACT_EMAIL = "support@openstudent.app"; // TODO: replace with real contact email

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.06] bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              מעקב הלימודים לסטודנטים של האוניברסיטה הפתוחה — קורסים, מטלות,
              מבחנים והתקדמות בתואר במקום אחד.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5 text-sm">
            <span className="font-display font-semibold text-ink">קישורים</span>
            <Link href="/support" className="text-muted transition-colors hover:text-ink">
              תמיכה
            </Link>
            <Link href="/privacy" className="text-muted transition-colors hover:text-ink">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="text-muted transition-colors hover:text-ink">
              תנאי שימוש
            </Link>
          </nav>

          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-display font-semibold text-ink">יצירת קשר</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-muted transition-colors hover:text-ink"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.06] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} אופן סטודנט. כל הזכויות שמורות.</p>
          <p className="max-w-md leading-relaxed">
            אפליקציה עצמאית שאינה מזוהה עם, מסונפת ל־ או מאושרת על ידי האוניברסיטה הפתוחה.
          </p>
        </div>
      </div>
    </footer>
  );
}
