import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseStoreButtons from "../../components/CourseStoreButtons";
import JsonLd from "../../components/JsonLd";
import {
  FEATURED_COURSES,
  courseDescription,
  courseIntro,
  creditsLabel,
  creditsShort,
  getFeaturedCourse,
  relatedCourses,
} from "../../lib/courses";
import { SITE_URL } from "../../lib/site";
import { breadcrumbSchema, courseSchema } from "../../lib/structured-data";

type Props = { params: Promise<{ number: string }> };

// Only the featured courses exist; any other number is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURED_COURSES.map((c) => ({ number: c.courseNumber }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const course = getFeaturedCourse(number);
  if (!course) return {};

  const path = `/courses/${course.courseNumber}`;
  const title = `${course.name} (${course.courseNumber}) – מטלות, מבחן ופומודורו | אופן סטודנט`;
  const description = courseDescription(course);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    // Next replaces the layout's openGraph wholesale, so repeat the shared bits.
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "אופן סטודנט",
      locale: "he_IL",
      type: "article",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: "אופן סטודנט — כל התואר במקום אחד" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { number } = await params;
  const course = getFeaturedCourse(number);
  if (!course) notFound();

  const path = `/courses/${course.courseNumber}`;
  const intro = courseIntro(course);
  const related = relatedCourses(course);
  const credits = creditsLabel(course.credits);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-16">
      <JsonLd
        data={courseSchema({
          courseNumber: course.courseNumber,
          name: course.name,
          description: courseDescription(course),
          credits: course.credits,
          path,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "אופן סטודנט", path: "/" },
          { name: "קורסים", path: "/courses" },
          { name: `${course.courseNumber} ${course.name}`, path },
        ])}
      />

      <nav aria-label="פירורי לחם" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">
              דף הבית
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/courses" className="hover:text-ink">
              קורסים
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{course.courseNumber}</li>
        </ol>
      </nav>

      <header className="mt-6">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          <span className="block text-xl font-semibold text-brand-dark sm:text-2xl">
            קורס {course.courseNumber}
          </span>
          {course.name}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {credits && (
            <span className="rounded-full bg-brand-soft px-3 py-1 font-medium text-brand-dark">
              {credits}
            </span>
          )}
          {course.faculty.map((f) => (
            <span key={f} className="rounded-full bg-mist px-3 py-1 text-muted">
              {f}
            </span>
          ))}
        </div>
      </header>

      <section className="mt-8 space-y-4 text-lg leading-relaxed text-ink/90">
        <p>{intro.opener}</p>
        <p>{intro.fieldLine}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          מה אופן סטודנט עושה בשביל הקורס הזה
        </h2>
        <ul className="mt-4 space-y-3">
          {intro.features.map((f) => (
            <li key={f.title} className="rounded-2xl border border-black/[0.08] bg-paper p-4">
              <h3 className="font-display font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 leading-relaxed text-ink/90">{intro.closer}</p>
      </section>

      <section className="mt-8 rounded-3xl bg-mist p-6">
        <h2 className="font-display text-lg font-semibold text-ink">
          הורידו את אופן סטודנט בחינם
        </h2>
        <div className="mt-4">
          <CourseStoreButtons courseNumber={course.courseNumber} />
        </div>
      </section>

      <p className="mt-6 rounded-2xl border border-accent/20 bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink/80">
        אופן סטודנט היא אפליקציה עצמאית ואינה קשורה לאוניברסיטה הפתוחה.
      </p>

      <section className="mt-10 border-t border-black/[0.08] pt-8">
        <h2 className="font-display text-xl font-semibold text-ink">קורסים נוספים</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.map((r) => (
            <li key={r.courseNumber}>
              <Link
                href={`/courses/${r.courseNumber}`}
                className="flex h-full items-center justify-between gap-4 rounded-2xl border border-black/[0.08] px-4 py-3 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
              >
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold text-brand-dark">
                    {r.courseNumber}
                  </span>
                  <span className="block font-medium leading-snug text-ink">{r.name}</span>
                </span>
                {creditsShort(r.credits) && (
                  <span className="shrink-0 text-xs text-muted">{creditsShort(r.credits)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/courses"
          className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-brand-dark hover:underline"
        >
          לכל הקורסים
          <span aria-hidden="true">←</span>
        </Link>
      </section>
    </div>
  );
}
