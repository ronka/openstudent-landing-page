"use client";

import { capture, type Store } from "../lib/analytics";
import { courseStoreLinks } from "../lib/store-links";
import { AppStoreIcon, GooglePlayIcon, StoreBadge } from "./StoreBadges";

/** Store buttons on a course landing page, tagged with the course number. */
export default function CourseStoreButtons({ courseNumber }: { courseNumber: string }) {
  const links = courseStoreLinks(courseNumber);
  const track = (store: Store) => () =>
    capture("course_page_store_click", { course_number: courseNumber, store });

  return (
    <div className="flex flex-wrap gap-3">
      <StoreBadge
        href={links.appStore}
        label="App Store"
        icon={<AppStoreIcon />}
        onClick={track("app_store")}
      />
      <StoreBadge
        href={links.googlePlay}
        label="Google Play"
        icon={<GooglePlayIcon />}
        onClick={track("google_play")}
      />
    </div>
  );
}
