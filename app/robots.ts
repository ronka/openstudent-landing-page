import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/**
 * A blanket allow. Naming individual AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot…) would only be worth the upkeep if we wanted to treat some
 * differently from others — for a free app's marketing site, every one of
 * them quoting us is upside.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
