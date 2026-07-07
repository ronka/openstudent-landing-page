import type { Metadata } from "next";
import { Rubik, Assistant } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Providers from "./providers";

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

const SITE_URL = "https://openstudent.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "אופן סטודנט — מעקב לימודים לסטודנטים של האוניברסיטה הפתוחה",
  description:
    "אופן סטודנט היא אפליקציה לניהול התואר באוניברסיטה הפתוחה: קורסים, מטלות, ממ\"נים, מבחנים, טיימר פומודורו וקבוצות לימוד — הכול במקום אחד.",
  keywords: [
    "האוניברסיטה הפתוחה",
    "מעקב לימודים",
    "ניהול קורסים",
    "ממנים",
    "טיימר פומודורו",
    "אופן סטודנט",
  ],
  openGraph: {
    title: "אופן סטודנט — מעקב לימודים לאוניברסיטה הפתוחה",
    description:
      "נהלו את התואר באוניברסיטה הפתוחה: קורסים, מטלות, מבחנים, פומודורו וקבוצות לימוד.",
    url: SITE_URL,
    siteName: "אופן סטודנט",
    locale: "he_IL",
    type: "website",
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
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
