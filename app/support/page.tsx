import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";

const CONTACT_EMAIL = "support@openstudent.app"; // TODO: replace with real contact email
const GOOGLE_FORM_URL = "REPLACE_ME_GOOGLE_FORM_URL"; // TODO: paste the Google Form link

const faq = [
  {
    q: "האם האפליקציה בחינם?",
    a: "כן, אופן סטודנט חינמית להורדה ולשימוש.",
  },
  {
    q: "האם הנתונים שלי מסונכרנים בין מכשירים?",
    a: "אם התחברתם לחשבון, הקורסים והמטלות שלכם נשמרים ומסונכרנים בין המכשירים שלכם.",
  },
  {
    q: "מצאתי באג או שיש לי רעיון לשיפור — לאן לפנות?",
    a: "נשמח לשמוע! מלאו את הטופס למטה או שלחו לנו דוא״ל, ונחזור אליכם.",
  },
];

export default function SupportPage() {
  const formReady = GOOGLE_FORM_URL.startsWith("http");

  return (
    <LegalShell
      title="תמיכה"
      intro="נתקלתם בבעיה, יש לכם שאלה או רעיון? אנחנו כאן. הדרך המהירה ביותר להגיע אלינו היא דרך טופס הפנייה."
    >
      <section>
        <h2>שליחת פנייה</h2>
        <p>
          מלאו את הטופס ונחזור אליכם בהקדם. אפשר לדווח על באג, לבקש תכונה או לשאול כל דבר.
        </p>
        <div className="mt-4">
          <a
            href={formReady ? GOOGLE_FORM_URL : undefined}
            target={formReady ? "_blank" : undefined}
            rel={formReady ? "noopener noreferrer" : undefined}
            aria-disabled={!formReady}
            className={`inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-display font-semibold text-white no-underline transition-transform hover:-translate-y-0.5 ${
              formReady ? "" : "pointer-events-none opacity-60"
            }`}
          >
            פתיחת טופס הפנייה
            <span aria-hidden="true">←</span>
          </a>
          {!formReady && (
            <p className="mt-2 text-sm text-accent">
              (קישור הטופס עדיין לא הוגדר — יש להחליף את GOOGLE_FORM_URL בקובץ support/page.tsx)
            </p>
          )}
        </div>
      </section>

      <section>
        <h2>דוא״ל</h2>
        <p>
          מעדיפים דוא״ל? כתבו לנו ל־{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ונשתדל לחזור אליכם תוך
          כמה ימי עבודה.
        </p>
      </section>

      <section>
        <h2>שאלות נפוצות</h2>
        <div className="space-y-5">
          {faq.map((item) => (
            <div key={item.q}>
              <p className="font-display font-semibold text-ink">{item.q}</p>
              <p className="mt-1 text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </LegalShell>
  );
}
