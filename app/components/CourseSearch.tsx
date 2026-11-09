"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type CourseListItem = {
  courseNumber: string;
  name: string;
  credits: string | null;
};

/** Drops quotes, gershayim and dashes so "ממ"ן", "ממ״ן" and "ממן" all match. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/["'`״׳–—\-,.:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CourseSearch({ courses }: { courses: CourseListItem[] }) {
  const [query, setQuery] = useState("");

  const indexed = useMemo(
    () => courses.map((c) => ({ ...c, haystack: normalize(`${c.courseNumber} ${c.name}`) })),
    [courses],
  );

  const q = normalize(query);
  const results = q ? indexed.filter((c) => c.haystack.includes(q)) : indexed;

  return (
    <div>
      <label htmlFor="course-search" className="sr-only">
        חיפוש קורס לפי מספר או שם
      </label>
      <input
        id="course-search"
        type="search"
        inputMode="search"
        autoComplete="off"
        placeholder="מספר או שם קורס, למשל 20441"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-2xl border border-black/10 bg-paper px-5 py-3.5 text-base text-ink shadow-sm outline-none placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {q ? `${results.length} קורסים נמצאו` : `${courses.length} קורסים`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {results.map((c) => (
            <li key={c.courseNumber}>
              <Link
                href={`/courses/${c.courseNumber}`}
                className="flex h-full items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-paper px-4 py-3.5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
              >
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold text-brand-dark">
                    {c.courseNumber}
                  </span>
                  <span className="block font-medium leading-snug text-ink">{c.name}</span>
                </span>
                {c.credits && (
                  <span className="shrink-0 rounded-full bg-mist px-2.5 py-1 text-xs text-muted">
                    {c.credits}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl bg-mist px-5 py-6 text-center text-muted">
          לא מצאנו קורס שמתאים לחיפוש. אפשר להוסיף כל קורס מהקטלוג ישירות באפליקציה.
        </p>
      )}
    </div>
  );
}
