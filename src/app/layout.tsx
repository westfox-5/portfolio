import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GITHUB_URL, OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/site";



import FloatingBubbles from "../components/FloatingBubbles";
import ScrollToTopButton from "../components/ScrollToTopButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/fox-mark.png`,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  worksFor: { "@type": "Organization", name: "T.A.S. S.p.A." },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zero Branco",
    addressRegion: "TV",
    addressCountry: "IT",
  },
  knowsAbout: ["Java", "Spring Boot", "Kafka", "Distributed systems", "Docker", "Kubernetes"],
  sameAs: [GITHUB_URL],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  icons: "/favicon.ico",
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    firstName: "Davide",
    lastName: "Volpe",
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" className="overflow-x-hidden max-w-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden max-w-full`}
        >
        <FloatingBubbles />
        <ScrollToTopButton />
        {children}
      </body>
    </html>
  );
}
