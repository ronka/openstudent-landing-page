import { NextResponse } from "next/server";
import { trackShortlinkVisit } from "../lib/track-shortlink";

const ZERO_TO_APP_URL = new URL("https://zerotoapp.co.il/");
ZERO_TO_APP_URL.search = new URLSearchParams({
  utm_source: "openstudent_app",
  utm_medium: "in_app",
  utm_campaign: "made_with_zero_to_app",
  utm_content: "settings_footer",
  utm_term: "mobile_starter",
}).toString();

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await trackShortlinkVisit(request, "zero_to_app_shortlink_visited");

  const response = NextResponse.redirect(ZERO_TO_APP_URL, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
