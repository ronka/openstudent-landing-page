import type { Metadata } from "next";
import { Rubik, Assistant } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import JsonLd from "./components/JsonLd";
import Providers from "./providers";
import { SITE_URL } from "./lib/site";
import { organizationSchema, websiteSchema } from "./lib/structured-data";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "אופן סטודנט — מעקב לימודים לסטודנטים של האוניברסיטה הפתוחה",
  description:
    "אופן סטודנט היא אפליקציה לניהול התואר באוניברסיטה הפתוחה: קורסים, מטלות, ממ\"נים, מבחנים, טיימר פומודורו וקבוצות לימוד — הכול במקום אחד.",
  applicationName: "אופן סטודנט",
  creator: "אופן סטודנט",
  publisher: "אופן סטודנט",
  keywords: [
    "האוניברסיטה הפתוחה",
    "מעקב לימודים",
    "ניהול קורסים",
    "ממנים",
    "טיימר פומודורו",
    "אופן סטודנט",
  ],
  alternates: { canonical: "/" },
  // max-snippet: -1 lifts the cap on how much of a page may be quoted in
  // search results and AI overviews — the whole point of the FAQ answers.
  // Set on the generic `robots` meta as well as googleBot, since Bing (which
  // backs ChatGPT search) reads the generic one.
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "אופן סטודנט — מעקב לימודים לאוניברסיטה הפתוחה",
    description:
      "נהלו את התואר באוניברסיטה הפתוחה: קורסים, מטלות, מבחנים, פומודורו וקבוצות לימוד.",
    url: SITE_URL,
    siteName: "אופן סטודנט",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "אופן סטודנט — מעקב לימודים לאוניברסיטה הפתוחה",
    description:
      "נהלו את התואר באוניברסיטה הפתוחה: קורסים, מטלות, מבחנים, פומודורו וקבוצות לימוד.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${assistant.variable}`}>
      <body className="min-h-screen bg-paper text-ink">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
