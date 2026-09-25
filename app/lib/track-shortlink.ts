export async function trackShortlinkVisit(request: Request, event: string) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!key) return;

  try {
    await fetch(`${host.replace(/\/$/, "")}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        event,
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
    // Analytics should never prevent a visitor from reaching the destination.
  }
}
