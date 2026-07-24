import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import LegalShell from "../components/LegalShell";
import { LAST_MODIFIED } from "../lib/site";
import { webPageSchema } from "../lib/structured-data";

const CONTACT_EMAIL = "contactdadyapp@gmail.com";
const DESCRIPTION = "התנאים לשימוש באפליקציית אופן סטודנט.";

export const metadata: Metadata = {
  title: "תנאי שימוש — אופן סטודנט",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  // Next replaces the layout's openGraph wholesale rather than merging it, so
  // siteName and locale have to be repeated here or they're simply lost.
  openGraph: {
    title: "תנאי שימוש — אופן סטודנט",
    description: DESCRIPTION,
    url: "/terms",
    siteName: "אופן סטודנט",
    locale: "he_IL",
    type: "article",
  },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="תנאי שימוש"
      updated="7 ביולי 2026"
      intro="השימוש באפליקציית אופן סטודנט כפוף לתנאים שלהלן. השימוש באפליקציה מהווה הסכמה לתנאים אלה."
    >
      <JsonLd
        data={webPageSchema({
          path: "/terms",
          name: "תנאי שימוש — אופן סטודנט",
          description: DESCRIPTION,
          dateModified: LAST_MODIFIED.terms,
        })}
      />
      <section>
        <h2>1. קבלת התנאים</h2>
        <p>
          בהורדה או בשימוש באפליקציית אופן סטודנט (״האפליקציה״) אתם מסכימים לתנאי שימוש אלה.
          אם אינכם מסכימים לתנאים, אנא הימנעו משימוש באפליקציה.
        </p>
      </section>

      <section>
        <h2>2. אי־תלות באוניברסיטה הפתוחה</h2>
        <p>
          אופן סטודנט היא אפליקציה עצמאית. היא <strong>אינה מזוהה עם, מסונפת ל־ או מאושרת
          על ידי האוניברסיטה הפתוחה</strong> או כל מוסד אקדמי אחר. שמות קורסים, מספרי קורסים
          ומונחים אקדמיים מוצגים לצורכי נוחות בלבד ואינם מהווים מקור רשמי. המידע הרשמי המחייב
          הוא זה המופיע במערכות האוניברסיטה.
        </p>
      </section>

      <section>
        <h2>3. השימוש המותר</h2>
        <p>אתם מתחייבים להשתמש באפליקציה לצרכים אישיים וחוקיים בלבד, ולא:</p>
        <ul>
          <li>לנסות לשבש, לפרוץ או לפגוע בפעולת האפליקציה או בשרתיה.</li>
          <li>להשתמש באפליקציה באופן המפר חוק או זכויות של צד שלישי.</li>
          <li>לבצע הנדסה לאחור, העתקה או הפצה בלתי מורשית של האפליקציה.</li>
        </ul>
      </section>

      <section>
        <h2>4. התוכן שלכם</h2>
        <p>
          הנתונים שאתם מזינים (קורסים, מטלות, מבחנים וכו׳) שייכים לכם, ואתם אחראים לדיוקם.
          אתם אחראים לוודא את תאריכי ההגשה, המבחנים והדרישות מול המקורות הרשמיים.
        </p>
      </section>

      <section>
        <h2>5. השירות ״כמות שהוא״</h2>
        <p>
          האפליקציה מסופקת ״כמות שהיא״ (AS IS) וללא אחריות מכל סוג. איננו מתחייבים שהאפליקציה
          תהיה זמינה ברציפות, נטולת תקלות או מדויקת בכל עת. השימוש בה הוא על אחריותכם בלבד.
        </p>
      </section>

      <section>
        <h2>6. הגבלת אחריות</h2>
        <p>
          במידה המרבית המותרת בדין, לא נהיה אחראים לכל נזק ישיר או עקיף הנובע מהשימוש
          באפליקציה, לרבות אך לא רק פספוס של תאריכי הגשה, מבחנים או כל החלטה אקדמית שהתקבלה
          בהסתמך על האפליקציה.
        </p>
      </section>

      <section>
        <h2>7. שינויים בשירות ובתנאים</h2>
        <p>
          אנו רשאים לעדכן, לשנות או להפסיק חלקים מהאפליקציה או את התנאים הללו בכל עת. המשך
          השימוש לאחר עדכון מהווה הסכמה לתנאים המעודכנים.
        </p>
      </section>

      <section>
        <h2>8. הדין החל</h2>
        <p>
          על תנאים אלה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית תהיה נתונה לבתי המשפט
          המוסמכים בישראל.
        </p>
      </section>

      <section>
        <h2>9. יצירת קשר</h2>
        <p>
          לשאלות בנוגע לתנאים ניתן לפנות אלינו בכתובת{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalShell>
  );
}
