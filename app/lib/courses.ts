/**
 * Server-side data for the course landing pages (/courses and
 * /courses/[number]). Everything here runs at build time.
 */
import catalog from "../data/catalog.json";
import {
  FEATURED_COURSE_NUMBERS,
  MAX_FEATURED_COURSES,
} from "../data/featured-courses";

export type Course = {
  courseNumber: string;
  name: string;
  /** null when the catalog has no credit value for the course. */
  credits: number | null;
  faculty: string[];
};

const byNumber = new Map<string, Course>(
  (catalog as Course[]).map((c) => [c.courseNumber, c]),
);

function loadFeatured(): Course[] {
  const seen = new Set<string>();
  const courses: Course[] = [];
  const skipped: string[] = [];

  for (const number of FEATURED_COURSE_NUMBERS.slice(0, MAX_FEATURED_COURSES)) {
    if (seen.has(number)) continue;
    seen.add(number);
    const course = byNumber.get(number);
    if (course) courses.push(course);
    else skipped.push(number);
  }

  if (skipped.length > 0) {
    console.warn(
      `[courses] Skipped ${skipped.length} featured course number(s) not in the catalog: ${skipped.join(", ")}`,
    );
  }
  return courses;
}

/** Featured courses in popularity order (most-added first). */
export const FEATURED_COURSES: readonly Course[] = loadFeatured();

const rankOf = new Map(FEATURED_COURSES.map((c, i) => [c.courseNumber, i]));

export function getFeaturedCourse(number: string): Course | undefined {
  return rankOf.has(number) ? byNumber.get(number) : undefined;
}

/** "6 נקודות זכות" / "נקודת זכות אחת" / null when unknown. */
export function creditsLabel(credits: number | null): string | null {
  if (credits === null) return null;
  if (credits === 0) return "ללא נקודות זכות";
  if (credits === 1) return "נקודת זכות אחת";
  return `${credits} נקודות זכות`;
}

/** Short form for the index list and badges, e.g. "6 נ״ז". */
export function creditsShort(credits: number | null): string | null {
  if (credits === null) return null;
  return `${credits} נ״ז`;
}

/**
 * 4 to 6 other featured courses: same faculty first (closest in popularity),
 * then topped up with the most popular courses overall.
 */
export function relatedCourses(course: Course, count = 5): Course[] {
  const rank = rankOf.get(course.courseNumber) ?? 0;
  const faculties = new Set(course.faculty);
  const others = FEATURED_COURSES.filter((c) => c.courseNumber !== course.courseNumber);

  const sameFaculty = others
    .filter((c) => c.faculty.some((f) => faculties.has(f)))
    .sort(
      (a, b) =>
        Math.abs((rankOf.get(a.courseNumber) ?? 0) - rank) -
        Math.abs((rankOf.get(b.courseNumber) ?? 0) - rank),
    );

  const picked = sameFaculty.slice(0, count);
  for (const c of others) {
    if (picked.length >= count) break;
    if (!picked.includes(c)) picked.push(c);
  }
  return picked;
}

// ---------------------------------------------------------------------------
// Intro copy
//
// Each page's intro is assembled from several pools of original sentences.
// The pick from each pool is driven by the course number, with a different
// offset per pool, so neighbouring courses don't share the same combination
// and no two pages read as near-duplicates. The copy only describes what the
// app does; nothing here comes from Open University material.
// ---------------------------------------------------------------------------

type Field = "quant" | "social" | "humanities" | "business" | "general";

const FIELD_BY_FACULTY: Record<string, Field> = {
  "מתמטיקה": "quant",
  "מדעי המחשב": "quant",
  "פיסיקה": "quant",
  "כימיה": "quant",
  "מדעי החיים": "quant",
  "הנדסת תוכנה": "quant",
  "הנדסת תעשייה וניהול": "quant",
  "מדעים - כללי": "quant",
  "מדעי כדור-הארץ": "quant",
  "פסיכולוגיה": "social",
  "סוציולוגיה ואנתרופולוגיה": "social",
  "מדע המדינה ויחסים בין-לאומיים": "social",
  "מדעי החברה - כללי": "social",
  "תקשורת": "social",
  "חינוך": "social",
  "מינהל, מדיניות ומנהיגות בחינוך": "social",
  "מדיניות ציבורית": "social",
  "ממשל ומדיניות ציבורית": "social",
  "משפטים": "social",
  "כלכלה": "business",
  "ניהול": "business",
  "מנהל עסקים": "business",
  "היסטוריה": "humanities",
  "מדעי היהדות": "humanities",
  "מדעי הרוח - כללי": "humanities",
  "ספרות": "humanities",
  "ארכיאולוגיה": "humanities",
  "בלשנות": "humanities",
  "לשון עברית": "humanities",
  "קולנוע": "humanities",
  "מוסיקה": "humanities",
};

function fieldOf(course: Course): Field {
  for (const f of course.faculty) {
    const field = FIELD_BY_FACULTY[f];
    if (field) return field;
  }
  return "general";
}

/** FNV-1a: small, stable, and well mixed even for neighbouring numbers. */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** Picks from a pool by course number, independently for each `salt`. */
function pick<T>(pool: readonly T[], number: string, salt: string): T {
  return pool[hash(`${number}:${salt}`) % pool.length];
}

type Ctx = { num: string; name: string; credits: string | null };

const OPENERS: ((c: Ctx) => string)[] = [
  (c) =>
    `לומדים את ${c.name} (${c.num}) באוניברסיטה הפתוחה? אופן סטודנט עוזרת לנהל את הקורס מהשבוע הראשון של הסמסטר ועד יום המבחן.`,
  (c) =>
    `נרשמתם לקורס ${c.num}? אופן סטודנט היא אפליקציה חינמית שמסדרת לכם את הסמסטר בקורס ${c.name}, בלי טבלאות ובלי פתקים מפוזרים.`,
  (c) =>
    `הוסיפו את ${c.name} לאופן סטודנט ותקבלו תמונה ברורה של הסמסטר: מה צריך להגיש, מתי המבחן וכמה כבר התקדמתם.`,
  (c) =>
    `${c.num} – ${c.name} הוא אחד הקורסים שסטודנטים מוסיפים הכי הרבה לאופן סטודנט, ולא במקרה: כשכל המועדים במקום אחד, הרבה יותר קל לשמור על קצב.`,
  (c) =>
    c.credits
      ? `${c.name} שווה ${c.credits}, ומאחורי כל נקודה יש מטלות, מועדים ושעות למידה. אופן סטודנט מרכזת את כל מה שקשור לקורס ${c.num} במסך אחד.`
      : `מאחורי הקורס ${c.name} יש מטלות, מועדים ושעות למידה. אופן סטודנט מרכזת את כל מה שקשור לקורס ${c.num} במסך אחד.`,
  (c) =>
    `סמסטר עם ${c.name} מתחיל הרבה יותר רגוע כשהכול מתוכנן מראש. באופן סטודנט מוסיפים את הקורס ${c.num} פעם אחת, ומשם הוא מנהל את עצמו.`,
];

const FIELD_LINES: Record<Field, ((c: Ctx) => string)[]> = {
  quant: [
    (c) =>
      `בקורס כמותי כמו ${c.name} ההצלחה נבנית מתרגול קבוע, ולא מלילה אחד לפני המבחן. האפליקציה עוזרת לפזר את העבודה לאורך כל הסמסטר.`,
    () =>
      `בקורסים שנשענים על פתרון תרגילים, ממ״ן שנדחה לרגע האחרון גורר אחריו את כל השבוע. כשתאריכי ההגשה מול העיניים, קל יותר להתחיל מוקדם.`,
    () =>
      `חומר מדעי מצטבר מהר: כל יחידה נשענת על הקודמת. מעקב מסודר אחרי המטלות עוזר לא להישאר מאחור כבר באמצע הסמסטר.`,
  ],
  social: [
    (c) =>
      `ב${c.name} יש הרבה חומר קריאה, וקל לדחות אותו לשבוע הבא. חלוקה של הלמידה לפרקי זמן קצרים ומוגדרים הופכת את הקריאה לשגרה.`,
    () =>
      `קורסים במדעי החברה דורשים קריאה רציפה וכתיבה מסודרת של מטלות. כשיודעים מראש מתי כל ממ״ן מוגש, אפשר לתכנן את הקריאה סביבו.`,
    () =>
      `מאמרים, פרקי ספר ומטלות כתובות – הכול צריך להיכנס לשבוע שכבר מלא. תכנון קדימה הוא מה שמשאיר זמן לחזרה לפני הבחינה.`,
  ],
  business: [
    (c) =>
      `${c.name} משלב מושגים ותרגול, ושניהם צריכים זמן. כשרואים את כל המועדים של הקורס ברשימה אחת, קל יותר לבנות תוכנית עבודה שבועית.`,
    () =>
      `בקורסים בכלכלה ובניהול כל נושא נבנה על הקודם. מעקב אחרי המטלות לפי תאריך עוזר להתקדם בקצב קבוע ולא להשלים פערים ברגע האחרון.`,
  ],
  humanities: [
    (c) =>
      `${c.name} דורש קריאה מעמיקה ומחשבה, וזה לא קורה בחטף. פרקי למידה ממוקדים עוזרים לפנות לחומר זמן אמיתי גם בשבוע עמוס.`,
    () =>
      `בקורסים במדעי הרוח העבודה העיקרית היא קריאה וכתיבה. כשמועדי ההגשה ידועים מראש, אפשר להתחיל לכתוב בלי לחץ של הרגע האחרון.`,
  ],
  general: [
    () =>
      `כמו בכל קורס באוניברסיטה הפתוחה, הלמידה עצמאית והאחריות על הקצב היא שלכם. אופן סטודנט עוזרת לשמור על הקצב הזה.`,
    () =>
      `בלמידה מרחוק אין מי שמזכיר לכם מה מחכה השבוע. בשביל זה יש את האפליקציה.`,
  ],
};

type Feature = { title: string; lines: ((c: Ctx) => string)[] };

const FEATURES: Feature[] = [
  {
    title: "ממ״נים וממ״חים",
    lines: [
      (c) =>
        `מזינים את תאריכי ההגשה של הממ״נים והממ״חים בקורס ${c.num}, ורואים תמיד מה המטלה הדחופה הבאה.`,
      () =>
        `כל המטלות של הקורס ברשימה אחת לפי תאריך הגשה, עם סימון של מה כבר הוגש ומה עוד נשאר.`,
      (c) =>
        `לכל ממ״ן וממ״ח ב${c.name} יש מקום משלו באפליקציה, עם תאריך הגשה ברור, כך ששום מטלה לא נשכחת.`,
    ],
  },
  {
    title: "ספירה לאחור למבחן",
    lines: [
      (c) =>
        `מוסיפים את מועד הבחינה ב${c.name} ורואים כמה ימים נשארו, כדי לתכנן את החזרה בזמן.`,
      () =>
        `המבחן הקרוב תמיד מול העיניים, עם ספירה לאחור של הימים עד המועד.`,
      (c) =>
        `ספירה לאחור עד המבחן בקורס ${c.num} עוזרת לדעת מתי להפסיק ללמוד חומר חדש ולעבור לחזרה.`,
    ],
  },
  {
    title: "טיימר פומודורו",
    lines: [
      () =>
        `טיימר פומודורו מובנה: 25 דקות של למידה ממוקדת, הפסקה קצרה, וחוזר חלילה.`,
      (c) =>
        `יושבים ללמוד ${c.name}? מפעילים את טיימר הפומודורו ועובדים במחזורים קצרים עם הפסקות, בלי לאבד ריכוז.`,
      () =>
        `שיטת פומודורו בלחיצה אחת, כדי להפוך שעה של ״אני צריך ללמוד״ לסשן למידה אמיתי.`,
    ],
  },
  {
    title: "קבוצת וואטסאפ לקורס",
    lines: [
      (c) =>
        `שומרים את הקישור לקבוצת הוואטסאפ של הקורס ${c.num} בתוך האפליקציה, ומגיעים לקבוצה הנכונה בלחיצה.`,
      () =>
        `לכל קורס יש מקום לקישור לקבוצת לימוד בוואטסאפ, כך שלא צריך לחפש אותו בין עשרות שיחות.`,
      (c) =>
        `קבוצת הלימוד של ${c.name} במרחק לחיצה: הקישור לוואטסאפ שמור יחד עם שאר פרטי הקורס.`,
    ],
  },
  {
    title: "ממוצע והתקדמות בתואר",
    lines: [
      (c) =>
        c.credits
          ? `כשהציון בקורס מגיע, ${c.credits} של ${c.name} נכנסות לחישוב הממוצע ולאחוז ההשלמה של התואר.`
          : `כשהציון בקורס מגיע, הוא נכנס לחישוב הממוצע ולתמונת ההתקדמות בתואר.`,
      () =>
        `הציון של הקורס מתעדכן בממוצע המשוקלל, ולצדו אחוז ההשלמה של התואר כולו.`,
      (c) =>
        `אחרי הבחינה מעדכנים את הציון ב${c.num}, ורואים איך הוא משפיע על הממוצע ועל ההתקדמות לקראת התואר.`,
    ],
  },
];

const CLOSERS: ((c: Ctx) => string)[] = [
  () => `האפליקציה חינמית, בעברית, וזמינה ל־iOS ול־Android.`,
  (c) => `הורידו את אופן סטודנט בחינם והוסיפו את ${c.num} כבר עכשיו.`,
  () => `אופן סטודנט חינמית לגמרי, בלי מנוי ובלי פרסומות בדרך.`,
  (c) => `כמה דקות של הגדרה בתחילת הסמסטר, וכל מה שקשור ל${c.name} מסודר עד סוף הקורס.`,
];

export type CourseIntro = {
  opener: string;
  fieldLine: string;
  features: { title: string; body: string }[];
  closer: string;
};

export function courseIntro(course: Course): CourseIntro {
  const num = course.courseNumber;
  const ctx: Ctx = {
    num: course.courseNumber,
    name: course.name,
    credits:
      course.credits && course.credits > 1 ? `${course.credits} נקודות זכות` : null,
  };

  // Rotate the feature order too, so the list itself doesn't repeat verbatim.
  const shift = hash(`${num}:order`) % FEATURES.length;
  const features = [...FEATURES.slice(shift), ...FEATURES.slice(0, shift)].map((f) => ({
    title: f.title,
    body: pick(f.lines, num, f.title)(ctx),
  }));

  return {
    opener: pick(OPENERS, num, "opener")(ctx),
    fieldLine: pick(FIELD_LINES[fieldOf(course)], num, "field")(ctx),
    features,
    closer: pick(CLOSERS, num, "closer")(ctx),
  };
}

export function courseDescription(course: Course): string {
  const credits = creditsShort(course.credits);
  const head = `${course.courseNumber} ${course.name}${credits ? ` (${credits})` : ""}`;
  const variants = [
    `${head}: ממ״נים וממ״חים עם תאריכי הגשה, ספירה לאחור למבחן, פומודורו וקבוצת וואטסאפ – באפליקציה החינמית אופן סטודנט.`,
    `מנהלים את ${head} באופן סטודנט: מועדי הגשה, ספירה לאחור לבחינה, טיימר פומודורו וחישוב ממוצע, בחינם.`,
    `כל מה שצריך כדי לעבור את ${head} בסדר: מטלות, מבחן, פומודורו וקבוצת לימוד, באפליקציה העצמאית אופן סטודנט.`,
  ];
  return pick(variants, course.courseNumber, "description");
}
