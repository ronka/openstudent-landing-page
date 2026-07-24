"use client";

import Link from "next/link";
import { capture, type EventMap } from "../lib/analytics";

/**
 * A link that reports its own click. The event name and payload are passed as
 * plain props rather than a callback so that server components — the legal and
 * support pages, which export `metadata` and must stay on the server — can
 * still use it.
 *
 * Off-site and mailto hrefs render a plain anchor; everything else routes
 * through next/link.
 */
export default function TrackedLink<E extends keyof EventMap>({
  href,
  event,
  eventProps,
  className,
  children,
  ...rest
}: {
  href: string;
  event: E;
  eventProps: EventMap[E];
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const onClick = () => capture(event, eventProps);

  const isHttp = href.startsWith("http");
  const isPlainAnchor = isHttp || href.startsWith("mailto:");

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
