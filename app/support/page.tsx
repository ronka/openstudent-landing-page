import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import LegalShell from "../components/LegalShell";
import TrackedLink from "../components/TrackedLink";
import { faqPageSchema } from "../lib/structured-data";

const CONTACT_EMAIL = "contactdadyapp@gmail.com";
const GOOGLE_FORM_URL = "https://forms.gle/CvKd8cvFkAz7Fgz89";

export const metadata: Metadata = {
  title: "תמיכה — אופן סטודנט",
  description: "שאלות, דיווח על באגים ובקשות לתכונות חדשות באפליקציית אופן סטודנט.",
  alternates: { canonical: "/support" },
  // Next replaces the layout's openGraph wholesale rather than merging it, so
  // siteName and locale have to be repeated here or they're simply lost.
  openGraph: {
    title: "תמיכה — אופן סטודנט",
    description:
      "שאלות, דיווח על באגים ובקשות לתכונות חדשות באפליקציית אופן סטודנט.",
    url: "/support",
    siteName: "אופן סטודנט",
    locale: "he_IL",
    type: "article",
  },
};

/**
 * Account, data and troubleshooting questions. The product questions ("is it
 * free?", "what does it do?") live in the homepage FAQ instead — the two lists
 * stay disjoint so the two FAQPage blocks don't compete with each other.
 */
const faq = [
  {
    q: "מצאתי באג או שיש לי רעיון לשיפור — לאן לפנות?",
    a: "נשמח לשמוע! מלאו את טופס הפנייה בעמוד זה או שלחו לנו דוא״ל לכתובת contactdadyapp@gmail.com, ונחזור אליכם.",
  },
  {
    q: "תוך כמה זמן מקבלים מענה?",
    a: "אנחנו קוראים כל פנייה ומשתדלים לחזור תוך כמה ימי עבודה. כדי לזרז את הטיפול, ציינו בפנייה את סוג המכשיר ואת גרסת האפליקציה.",
  },
  {
    q: "משהו באפליקציה לא עובד כמו שצריך — מה כדאי לנסות קודם?",
    a: "ודאו שמותקנת אצלכם הגרסה העדכנית ביותר מ־App Store או מ־Google Play, וסגרו ופתחו מחדש את האפליקציה. אם התקלה חוזרת, שלחו לנו פנייה עם תיאור קצר של מה שקרה.",
  },
  {
    q: "איך מוחקים קורס, מטלה או נתון בודד?",
    a: "אפשר למחוק קורסים, מטלות ונתונים אחרים בכל עת מתוך האפליקציה עצמה, בלי לפנות אלינו.",
  },
  {
    q: "איך מוחקים את החשבון ואת כל הנתונים שמשויכים אליו?",
    a: "כדי למחוק את החשבון ואת הנתונים המשויכים אליו, שלחו לנו בקשה בדוא״ל לכתובת contactdadyapp@gmail.com ונטפל בה.",
  },
  {
    q: "איזה מידע האפליקציה אוספת עליי?",
    a: "התוכן שאתם יוצרים (קורסים, מטלות, מבחנים), פרטי חשבון בסיסיים אם נרשמתם, ונתוני שימוש טכניים כמו סוג המכשיר וגרסת האפליקציה. איננו מוכרים את המידע ואיננו משתפים אותו עם צדדים שלישיים לצורכי פרסום. הפירוט המלא נמצא במדיניות הפרטיות.",
  },
];

export default function SupportPage() {
  return (
    <LegalShell
      title="תמיכה"
      intro="נתקלתם בבעיה, יש לכם שאלה או רעיון? אנחנו כאן. הדרך המהירה ביותר להגיע אלינו היא דרך טופס הפנייה."
    >
      <JsonLd data={faqPageSchema(faq, "/support")} />
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
            <article key={item.q}>
              <h3 className="font-display font-semibold text-ink">{item.q}</h3>
              <p className="mt-1 text-muted">{item.a}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-muted">
          שאלות על מה האפליקציה עושה נמצאות{" "}
          <Link href="/#faq">בשאלות והתשובות שבעמוד הבית</Link>, ופירוט מלא על
          נתונים ופרטיות נמצא ב<Link href="/privacy">מדיניות הפרטיות</Link>.
        </p>
      </section>
    </LegalShell>
  );
}
