"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { firstTouchProps } from "./lib/analytics";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (typeof window !== "undefined" && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    // Pageviews are captured manually in PostHogPageView so client-side
    // route changes (App Router) are tracked, not just full page loads.
    capture_pageview: false,
    loaded: (client) => {
      // Distinguishes this site from the openstudent mobile app, which
      // shares this PostHog project.
      client.register({ app: "landing-page" });
      // First campaign seen wins, so conversions stay attributable.
      client.register_once(firstTouchProps());
    },
  });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!POSTHOG_KEY) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const client = usePostHog();

  useEffect(() => {
    if (!pathname || !client) return;

    let url = window.origin + pathname;
    const search = searchParams.toString();
    if (search) url += `?${search}`;

    client.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, client]);

  return null;
}
