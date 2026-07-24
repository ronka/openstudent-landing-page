"use client";

import { capture, type BadgePlacement, type Store } from "../lib/analytics";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../lib/store-links";

function Badge({
  href,
  eyebrow,
  label,
  icon,
  store,
  placement,
}: {
  href: string;
  eyebrow: string;
  label: string;
  icon: React.ReactNode;
  store: Store;
  placement: BadgePlacement;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-ink px-5 py-3 text-white transition-transform hover:-translate-y-0.5"
      onClick={() => capture("store_badge_clicked", { store, placement })}
    >
      <span className="text-white">{icon}</span>
      <span className="flex flex-col text-right leading-tight">
        <span className="text-[0.7rem] text-white/70">{eyebrow}</span>
        <span className="font-display text-base font-semibold">{label}</span>
      </span>
    </a>
  );
}

/** `placement` separates the hero CTA from the closing one in analytics. */
export default function StoreBadges({ placement }: { placement: BadgePlacement }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap gap-3">
        <Badge
          href={APP_STORE_URL}
          eyebrow="הורדה מ־"
          label="App Store"
          store="app_store"
          placement={placement}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.365 1.43c0 1.14-.42 2.2-1.26 3.06-.94.98-2.06 1.54-3.12 1.46-.14-1.1.42-2.26 1.2-3.02.86-.86 2.28-1.48 3.18-1.5zM20.8 17.1c-.5 1.14-.74 1.64-1.38 2.64-.9 1.4-2.16 3.14-3.72 3.16-1.4.02-1.76-.9-3.66-.9-1.9 0-2.3.88-3.62.92-1.5.06-2.64-1.52-3.54-2.9-2.52-3.9-2.78-8.48-1.22-10.92 1.1-1.72 2.84-2.72 4.48-2.72 1.66 0 2.7.92 4.08.92 1.34 0 2.16-.92 4.08-.92 1.46 0 3 .8 4.1 2.18-3.6 1.98-3 7.14.62 8.54z" />
            </svg>
          }
        />
        <Badge
          href={GOOGLE_PLAY_URL}
          eyebrow="הורדה מ־"
          label="Google Play"
          store="google_play"
          placement={placement}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l.1.1L13 12.4v-.2L3.7 2.2l-.1.1z" fill="#00d0ff" />
              <path d="M16.4 15.6L13 12.4v-.2l3.4-3.2 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.2z" fill="#ffce00" />
              <path d="M16.5 15.6L13 12.3 3.6 21.7c.4.4 1 .4 1.7 0l11.2-6.1z" fill="#ff3d47" />
              <path d="M16.5 8.9L5.3 2.8c-.7-.4-1.3-.3-1.7.1L13 12.3l3.5-3.4z" fill="#00f076" />
            </svg>
          }
        />
      </div>
      <p className="text-sm text-muted">זמין עכשיו ל־iOS ול־Android</p>
    </div>
  );
}
