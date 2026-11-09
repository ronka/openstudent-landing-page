import type { Metadata } from "next";
import CourseSearch from "../components/CourseSearch";
import JsonLd from "../components/JsonLd";
import { FEATURED_COURSES, creditsShort } from "../lib/courses";
import { SITE_URL } from "../lib/site";
import { breadcrumbSchema } from "../lib/structured-data";

const title = "קורסים באוניברסיטה הפתוחה – מטלות, מבחנים ופומודורו | אופן סטודנט";
const description =
  "הקורסים הפופולריים ביותר בקרב משתמשי אופן סטודנט, עם עמוד לכל קורס: איך האפליקציה עוזרת לנהל ממ״נים, מבחנים, פומודורו וקבוצות לימוד.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/courses` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/courses`,
    siteName: "אופן סטודנט",
    locale: "he_IL",
    type: "website",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "אופן סטודנט — כל התואר במקום אחד" },
    ],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function CoursesIndexPage() {
  const courses = FEATURED_COURSES.map((c) => ({
    courseNumber: c.courseNumber,
    name: c.name,
    credits: creditsShort(c.credits),
  }));

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "אופן סטודנט", path: "/" },
          { name: "קורסים", path: "/courses" },
        ])}
      />
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          קורסים באוניברסיטה הפתוחה
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          הקורסים שסטודנטים מוסיפים הכי הרבה לאופן סטודנט. חפשו קורס לפי מספר או שם
          כדי לראות איך האפליקציה עוזרת לנהל אותו.
        </p>
        <p className="mt-4 text-sm text-muted">
          אופן סטודנט היא אפליקציה עצמאית ואינה קשורה לאוניברסיטה הפתוחה.
        </p>
      </header>

      <div className="mt-8">
        <CourseSearch courses={courses} />
      </div>
    </div>
  );
}
