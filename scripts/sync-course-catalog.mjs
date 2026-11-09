#!/usr/bin/env node
/**
 * Copies the course catalog from the openstudent app repo into this site.
 *
 * The catalog lives in the app repo at src/app/api/catalog.generated.json.
 * This site deploys on its own, so it keeps a trimmed snapshot (number, name,
 * credits, faculty) in app/data/catalog.json. Re-run after the app's catalog
 * changes:
 *
 *   node scripts/sync-course-catalog.mjs ../openstudent/src/app/api/catalog.generated.json
 *
 * The whole catalog is kept, not just the featured courses, so adding a number
 * to app/data/featured-courses.ts never needs a re-sync.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve(
  process.argv[2] ?? "../openstudent/src/app/api/catalog.generated.json",
);
const target = resolve("app/data/catalog.json");

const raw = JSON.parse(readFileSync(source, "utf8"));

const trimmed = raw
  .map((c) => ({
    courseNumber: String(c.courseNumber),
    name: String(c.name).trim(),
    credits: typeof c.credits === "number" ? c.credits : null,
    faculty: Array.isArray(c.faculty) ? c.faculty : [],
  }))
  .sort((a, b) => Number(a.courseNumber) - Number(b.courseNumber));

writeFileSync(target, JSON.stringify(trimmed, null, 1) + "\n");
console.log(`Wrote ${trimmed.length} courses from ${source} to ${target}`);
