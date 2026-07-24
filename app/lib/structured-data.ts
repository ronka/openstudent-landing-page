/**
 * schema.org graphs for the site, rendered through <JsonLd>.
 *
 * The copy itself always comes in as an argument rather than being retyped
 * here — the page stays the single source of truth, so the markup can't drift
 * away from what a human actually reads on the page.
 */
import { SITE_URL } from "./site";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./store-links";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "אופן סטודנט",
  alternateName: "Open Student",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "contactdadyapp@gmail.com",
  sameAs: [APP_STORE_URL, GOOGLE_PLAY_URL],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "אופן סטודנט",
  alternateName: "Open Student",
  url: SITE_URL,
  inLanguage: "he-IL",
  publisher: { "@id": ORGANIZATION_ID },
};

const SCREENSHOTS = [
  "/screenshots/home-page.png",
  "/screenshots/tasks.png",
  "/screenshots/task.png",
  "/screenshots/pomodoro.png",
  "/screenshots/study-group-links.png",
];

/**
 * The machine-readable factual core: what the app is, who it's for, what it
 * costs, where to get it. `featureList` is passed in from the page's own
 * feature cards.
 *
 * No aggregateRating — inventing one would breach Google's structured data
 * guidelines. Add it only when it can be backed by real store ratings.
 */
export function mobileApplicationSchema(featureList: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${SITE_URL}/#app`,
    name: "אופן סטודנט",
    alternateName: "Open Student",
    description:
      "אפליקציה לניהול התואר באוניברסיטה הפתוחה: קורסים, מטלות, ממ״נים, מבחנים, טיימר פומודורו וקבוצות לימוד במקום אחד.",
    url: SITE_URL,
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Study planner",
    operatingSystem: "iOS, Android",
    inLanguage: "he-IL",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ILS",
    },
    downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
    installUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
    screenshot: SCREENSHOTS.map((path) => `${SITE_URL}${path}`),
    featureList,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "סטודנטים באוניברסיטה הפתוחה",
    },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export type FaqItem = { q: string; a: string };

export function faqPageSchema(items: readonly FaqItem[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${pagePath}#faq`,
    inLanguage: "he-IL",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
  dateModified,
}: {
  path: string;
  name: string;
  description: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    dateModified,
    inLanguage: "he-IL",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}
