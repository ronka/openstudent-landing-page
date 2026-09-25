import { NextResponse } from "next/server";

const GITHUB_URL = "https://github.com/ronka/openstudent";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (key) {
    try {
      await fetch(`${host.replace(/\/$/, "")}/i/v0/e/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: key,
          event: "github_shortlink_visited",
          distinct_id: crypto.randomUUID(),
          properties: {
            app: "landing-page",
            $current_url: request.url,
            $process_person_profile: false,
          },
        }),
        signal: AbortSignal.timeout(1500),
      });
    } catch {
      // Analytics should never prevent the visitor from reaching the repository.
    }
  }

  const response = NextResponse.redirect(GITHUB_URL, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
