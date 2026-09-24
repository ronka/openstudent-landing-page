export const SITE_URL = "https://www.openstudent.co.il";

/**
 * Real content-change dates, kept by hand. The sitemap's lastmod and the
 * legal pages' dateModified both read from here, so a deploy that changes
 * nothing doesn't churn the freshness signal crawlers rely on.
 */
export const LAST_MODIFIED = {
  home: "2026-07-24",
  support: "2026-07-24",
  privacy: "2026-07-07",
  terms: "2026-07-07",
} as const;
