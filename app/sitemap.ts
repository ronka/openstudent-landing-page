import type { MetadataRoute } from "next";
import { FEATURED_COURSES } from "./lib/courses";
import { LAST_MODIFIED, SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: LAST_MODIFIED.support,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_MODIFIED.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_MODIFIED.terms,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: LAST_MODIFIED.courses,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...FEATURED_COURSES.map((c) => ({
      url: `${SITE_URL}/courses/${c.courseNumber}`,
      lastModified: LAST_MODIFIED.courses,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
