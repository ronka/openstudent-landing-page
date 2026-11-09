/**
 * Store URLs — single source of truth. Lives outside the client badge
 * component so the JSON-LD on the server can point at the same links.
 */
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/open-student-%D7%A0%D7%99%D7%94%D7%95%D7%9C-%D7%AA%D7%95%D7%90%D7%A8-%D7%91%D7%A4%D7%AA%D7%95%D7%97%D7%94/id6787389579";

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.ronkaa.openstudent";

/**
 * Store links for the course landing pages. Shorter App Store form, tagged so
 * store-side analytics can attribute installs to the course page.
 */
export function courseStoreLinks(courseNumber: string) {
  const utm = new URLSearchParams({
    utm_source: "site",
    utm_medium: "course_page",
    utm_campaign: courseNumber,
  }).toString();
  return {
    appStore: `https://apps.apple.com/il/app/id6787389579?${utm}`,
    googlePlay: `${GOOGLE_PLAY_URL}&${utm}`,
  };
}
