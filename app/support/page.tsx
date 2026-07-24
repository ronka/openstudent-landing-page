import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";
import TrackedLink from "../components/TrackedLink";

const CONTACT_EMAIL = "contactdadyapp@gmail.com";
const GOOGLE_FORM_URL = "https://forms.gle/CvKd8cvFkAz7Fgz89";

export const metadata: Metadata = {
  title: "תמיכה — אופן סטודנט",
  description: "שאלות, דיווח על באגים ובקשות לתכונות חדשות באפליקציית אופן סטודנט.",
};

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
          <TrackedLink
            href={GOOGLE_FORM_URL}
            event="support_form_opened"
            eventProps={{}}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-display font-semibold text-white no-underline transition-transform hover:-translate-y-0.5"
          >
            פתיחת טופס הפנייה
            <span aria-hidden="true">←</span>
          </TrackedLink>
        </div>
      </section>

      <section>
        <h2>דוא״ל</h2>
        <p>
          מעדיפים דוא״ל? כתבו לנו ל־{" "}
          <TrackedLink
            href={`mailto:${CONTACT_EMAIL}`}
            event="support_email_clicked"
            eventProps={{}}
          >
            {CONTACT_EMAIL}
          </TrackedLink>{" "}
          ונשתדל לחזור אליכם תוך
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
