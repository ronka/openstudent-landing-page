import { NextResponse } from "next/server";
import { trackShortlinkVisit } from "../lib/track-shortlink";

const GITHUB_URL = "https://github.com/ronka/openstudent";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await trackShortlinkVisit(request, "github_shortlink_visited");

  const response = NextResponse.redirect(GITHUB_URL, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
