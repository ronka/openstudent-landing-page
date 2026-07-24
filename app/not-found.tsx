import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "./components/LegalShell";

export const metadata: Metadata = {
  title: "העמוד לא נמצא — אופן סטודנט",
  // Without this the page inherits the layout's `index, follow`, which would
  // contradict the `noindex` Next emits for not-found. `index: false` alone
  // resolves to exactly "noindex", so the two tags agree instead of competing.
  robots: { index: false },
};

export default function NotFound() {
  return (
    <LegalShell
      title="העמוד לא נמצא"
      intro="הכתובת שהגעתם אליה לא קיימת, או שהעמוד הוסר. הנה הדרך חזרה."
    >
      <section>
        <h2>קישורים שימושיים</h2>
        <ul>
          <li>
            <Link href="/">עמוד הבית</Link> — מה אופן סטודנט עושה, ושאלות ותשובות.
          </li>
          <li>
            <Link href="/support">תמיכה</Link> — טופס פנייה, דוא״ל ושאלות נפוצות.
          </li>
          <li>
            <Link href="/privacy">מדיניות פרטיות</Link>
          </li>
          <li>
            <Link href="/terms">תנאי שימוש</Link>
          </li>
        </ul>
      </section>
    </LegalShell>
  );
}
