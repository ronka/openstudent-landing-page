import Link from "next/link";
import JsonLd from "./components/JsonLd";
import PhoneFrame from "./components/PhoneFrame";
import SectionTracker from "./components/SectionTracker";
import StoreBadges from "./components/StoreBadges";
import { faqPageSchema, mobileApplicationSchema } from "./lib/structured-data";

const features = [
  {
    icon: "📚",
    title: "כל הקורסים במקום אחד",
    body: "נהלו קורסים לפי נ\"ז, סמסטר ושנה, עם סטטוס ברור — בלימוד, מתוכנן או עברת.",
  },
  {
    icon: "✅",
    title: "מטלות וממ\"נים",
    body: "עקבו אחרי ממ\"נים וממ\"חים עם תאריכי הגשה, וראו תמיד מה המשימה הדחופה הבאה.",
  },
  {
    icon: "📝",
    title: "ספירה לאחור למבחן",
    body: "המבחן הקרוב תמיד לנגד העיניים, עם כמה ימים נשארו עד המועד.",
  },
  {
    icon: "⏳",
    title: "טיימר פומודורו",
    body: "מחזורי למידה של 25 דקות עם הפסקות, כדי לשמור על ריכוז לאורך כל הסשן.",
  },
  {
    icon: "💬",
    title: "קבוצות לימוד",
    body: "שמרו קישורי וואטסאפ לכל קורס, וקפצו לקבוצת הלימוד הנכונה בלחיצה.",
  },
  {
    icon: "📈",
    title: "התקדמות בתואר",
    body: "ציון ממוצע ואחוז ההשלמה של התואר — כדי לראות כמה כבר עשיתם והכול בתמונה אחת.",
  },
];

const screens = [
  {
    src: "/screenshots/pomodoro.png",
    alt: "מסך טיימר פומודורו באפליקציה",
    title: "ריכוז בזמן אמת",
    body: "פומודורו מובנה עם הסבר על השיטה — לחצו התחל וצאו לדרך.",
  },
  {
    src: "/screenshots/task.png",
    alt: "מסך קורס עם מטלות ומבחנים",
    title: "קורס אחד, כל הפרטים",
    body: "מטלות, מבחנים ותאריכי הגשה — הכול מרוכז תחת הקורס.",
  },
  {
    src: "/screenshots/study-group-links.png",
    alt: "מסך קבוצות לימוד עם קישורי וואטסאפ",
    title: "קבוצות הלימוד בהישג יד",
    body: "קישור וואטסאפ שמור לכל קורס, מסונן לפי סמסטר ושנה.",
  },
];

/**
 * Product questions, answered so each one stands on its own — an answer lifted
 * out of the page with no surrounding context should still be correct and
 * attributable, which is how both AI assistants and search snippets quote it.
 *
 * Deliberately disjoint from the support page's FAQ: duplicate Q&A across two
 * FAQPage blocks gets deduplicated or ignored.
 */
const faq = [
  {
    q: "מה זה אופן סטודנט?",
    a: "אופן סטודנט היא אפליקציה חינמית בעברית לניהול התואר באוניברסיטה הפתוחה. היא מרכזת במקום אחד את הקורסים, המטלות, הממ״נים, המבחנים, ההתקדמות בתואר וקבוצות הלימוד, כדי שכל מה שקשור לסמסטר יהיה במסך אחד.",
  },
  {
    q: "האם אופן סטודנט בחינם?",
    a: "כן. אופן סטודנט חינמית להורדה ולשימוש, ללא תשלום וללא מנוי.",
  },
  {
    q: "על אילו מכשירים אפשר להשתמש באפליקציה?",
    a: "אופן סטודנט זמינה ל־iOS ב־App Store ול־Android ב־Google Play. הממשק בעברית ומותאם לכיוון קריאה מימין לשמאל.",
  },
  {
    q: "איך האפליקציה עוזרת לעקוב אחרי ממ״נים וממ״חים?",
    a: "כל מטלה — ממ״ן (מטלת מנחה) או ממ״ח (מטלת מחשב) — נשמרת תחת הקורס שלה עם תאריך ההגשה שלה. האפליקציה מציגה תמיד מהי המטלה הדחופה הבאה, וספירה לאחור למבחן הקרוב.",
  },
  {
    q: "האם הנתונים מסונכרנים בין מכשירים?",
    a: "אם התחברתם לחשבון, הקורסים והמטלות שלכם נשמרים ומסונכרנים בין המכשירים שלכם.",
  },
  {
    q: "מה כולל טיימר הפומודורו?",
    a: "טיימר פומודורו מובנה עם מחזורי למידה של 25 דקות והפסקות ביניהם, כולל הסבר קצר על השיטה. אין צורך באפליקציית טיימר נפרדת.",
  },
  {
    q: "אפשר לשמור את קבוצות הלימוד של הקורסים?",
    a: "כן. אפשר לשמור קישור לקבוצת וואטסאפ לכל קורס, ולפתוח את הקבוצה הנכונה בלחיצה. הרשימה מסוננת לפי סמסטר ושנה.",
  },
  {
    q: "האם אופן סטודנט מזוהה עם האוניברסיטה הפתוחה?",
    a: "לא. אופן סטודנט היא אפליקציה עצמאית שאינה מזוהה עם, מסונפת ל־ או מאושרת על ידי האוניברסיטה הפתוחה. המידע הרשמי המחייב — תאריכי הגשה, מועדי מבחנים ודרישות קורס — הוא זה שמופיע במערכות האוניברסיטה.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={mobileApplicationSchema(features.map((f) => f.title))} />
      <JsonLd data={faqPageSchema(faq, "/")} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-[420px] bg-gradient-to-b from-brand-soft to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1.5 text-sm font-semibold text-brand-dark">
              <span className="h-2 w-2 rounded-full bg-brand" />
              לסטודנטים של האוניברסיטה הפתוחה
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              נהלו את התואר,
              <br />
              לא רק את הלימודים.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              אופן סטודנט מרכזת את הקורסים, המטלות, המבחנים וההתקדמות שלכם באוניברסיטה
              הפתוחה — כך שתמיד תדעו מה הצעד הבא.
            </p>

            <div className="mt-8" id="download">
              <StoreBadges placement="hero" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[300px] rise">
            <div
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-soft/70 blur-2xl"
              aria-hidden="true"
            />
            <PhoneFrame
              src="/screenshots/home-page.png"
              alt="מסך הבית של אפליקציית אופן סטודנט"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionTracker
        section="features"
        id="features"
        className="mx-auto max-w-6xl px-5 py-16 md:py-24"
      >
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            מה יש בפנים
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            כל מה שצריך כדי לא לפספס כלום
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-black/[0.07] bg-paper p-6 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(11,13,18,0.4)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-mist text-2xl">
                <span aria-hidden="true">{f.icon}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </SectionTracker>

      {/* Screens showcase */}
      <SectionTracker
        section="screens"
        id="screens"
        className="border-y border-black/[0.06] bg-mist"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
              מבט מבפנים
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              נבנתה להיות פשוטה, גם בשבוע של מבחנים
            </h2>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {screens.map((s) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="w-full max-w-[240px]">
                  <PhoneFrame src={s.src} alt={s.alt} />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionTracker>

      {/* FAQ */}
      <SectionTracker
        section="faq"
        id="faq"
        className="mx-auto max-w-3xl px-5 py-16 md:py-24"
      >
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
          שאלות ותשובות
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          מה כדאי לדעת לפני שמתחילים
        </h2>

        {/* Heading + paragraph rather than a <dl>: the H1→H2→H3 hierarchy is
            what gives each answer an addressable label when a model chunks the
            page, and <dt> may not contain heading content. */}
        <div className="mt-10 divide-y divide-black/[0.07] border-y border-black/[0.07]">
          {faq.map((item) => (
            <article key={item.q} className="py-6">
              <h3 className="font-display text-lg font-semibold text-ink">{item.q}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.a}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-[0.95rem] text-muted">
          לא מצאתם תשובה?{" "}
          <Link
            href="/support"
            className="font-medium text-brand-dark underline underline-offset-2"
          >
            עברו לעמוד התמיכה
          </Link>{" "}
          — שם יש שאלות על חשבון, נתונים ותקלות, וטופס פנייה ישיר.
        </p>
      </SectionTracker>

      {/* CTA */}
      <SectionTracker section="cta" className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center text-white sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #1f5bff 0, transparent 40%), radial-gradient(circle at 80% 80%, #c2530f 0, transparent 40%)",
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              התחילו לנהל את התואר בביטחון
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              הצטרפו לסטודנטים שמארגנים כל סמסטר במקום אחד. חינם להורדה.
            </p>
            <div className="mt-8 flex justify-center [&_p]:text-white/60">
              <StoreBadges placement="footer_cta" />
            </div>
          </div>
        </div>
      </SectionTracker>
    </>
  );
}
