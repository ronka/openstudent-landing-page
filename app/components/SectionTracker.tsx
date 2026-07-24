"use client";

import { useEffect, useRef } from "react";
import { capture, type Section } from "../lib/analytics";

/**
 * Drop-in replacement for a <section> that reports when the visitor actually
 * reaches it, which is how far-down-the-page engagement gets measured.
 *
 * Fires once per mount — scrolling back up and down again is not a new view.
 * The negative bottom margin means the section has to come properly into view
 * rather than merely clipping the bottom edge, and using a zero threshold
 * keeps that true for sections taller than the viewport.
 */
export default function SectionTracker({
  section,
  id,
  className,
  children,
}: {
  section: Section;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        capture("section_viewed", { section });
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [section]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
