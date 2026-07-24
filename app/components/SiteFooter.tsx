import TrackedLink from "./TrackedLink";
import Wordmark from "./Wordmark";

const CONTACT_EMAIL = "contactdadyapp@gmail.com";

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
            <TrackedLink
              href="/support"
              event="footer_link_clicked"
              eventProps={{ link: "support" }}
              className="text-muted transition-colors hover:text-ink"
            >
              תמיכה
            </TrackedLink>
            <TrackedLink
              href="/privacy"
              event="footer_link_clicked"
              eventProps={{ link: "privacy" }}
              className="text-muted transition-colors hover:text-ink"
            >
              מדיניות פרטיות
            </TrackedLink>
            <TrackedLink
              href="/terms"
              event="footer_link_clicked"
              eventProps={{ link: "terms" }}
              className="text-muted transition-colors hover:text-ink"
            >
              תנאי שימוש
            </TrackedLink>
          </nav>

          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-display font-semibold text-ink">יצירת קשר</span>
            <TrackedLink
              href={`mailto:${CONTACT_EMAIL}`}
              event="footer_link_clicked"
              eventProps={{ link: "email" }}
              className="text-muted transition-colors hover:text-ink"
            >
              {CONTACT_EMAIL}
            </TrackedLink>
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
