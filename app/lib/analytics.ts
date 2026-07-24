"use client";

import posthog from "posthog-js";

export type Store = "app_store" | "google_play";
export type BadgePlacement = "hero" | "footer_cta";
export type NavLink = "logo" | "features" | "screens" | "support" | "download";
export type FooterLink = "support" | "privacy" | "terms" | "email";
export type Section = "features" | "screens" | "faq" | "cta";

/**
 * Every event the landing page sends, with its payload. Keeping them in one
 * map is what stops names and property spellings from drifting apart as
 * components are added.
 */
export type EventMap = {
  store_badge_clicked: { store: Store; placement: BadgePlacement };
  nav_link_clicked: { link: NavLink };
  footer_link_clicked: { link: FooterLink };
  support_form_opened: Record<string, never>;
  support_email_clicked: Record<string, never>;
  section_viewed: { section: Section };
};

export function capture<E extends keyof EventMap>(event: E, props: EventMap[E]) {
  posthog.capture(event, props);
}

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * Campaign data for the visit, registered once so it rides along on every
 * later event. PostHog already puts utm_* on the $pageview it captures, but
 * that attribution doesn't reach the conversion — a store badge clicked after
 * a scroll or a route change carries no campaign context without this.
 *
 * Keys with no value are omitted: register_once would otherwise pin an empty
 * string from a direct visit and shut out a real campaign visit later on.
 */
export function firstTouchProps(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const props: Record<string, string> = {};

  for (const param of UTM_PARAMS) {
    const value = params.get(param);
    if (value) props[`initial_${param}`] = value;
  }
  if (document.referrer) props.initial_referrer = document.referrer;

  return props;
}
