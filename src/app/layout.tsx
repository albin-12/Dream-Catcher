import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://dreamcatcherstudylounge.com"),
  title: "Dream Catcher Study Lounge | Premium Study Space in East Fort, Thrissur",
  description:
    "A silent, fully air-conditioned study sanctuary in East Fort, Thrissur, Kerala for CA, CMA, ACCA, MBBS/NEET PG, PSC, and UPSC aspirants. Ergonomic seating, high-speed Wi-Fi, and 24/7 CCTV safety.",
  keywords: [
    "study lounge thrissur",
    "reading room east fort thrissur",
    "silent study space kerala",
    "air conditioned study space thrissur",
    "study space for ca aspirants thrissur",
    "neet pg library thrissur",
    "upsc study room east fort",
    "dream catcher study lounge",
    "study room walkthrough video thrissur",
  ],
  authors: [{ name: "Dream Catcher Study Lounge" }],
  creator: "Dream Catcher Study Lounge",
  openGraph: {
    title: "Dream Catcher Study Lounge | Premium Study Space in East Fort, Thrissur",
    description:
      "A silent, air-conditioned study space in East Fort, Thrissur for CA, CMA, ACCA, MBBS/NEET PG, PSC, and UPSC aspirants. Watch the interior walkthrough video.",
    url: "https://dreamcatcherstudylounge.com",
    siteName: "Dream Catcher Study Lounge",
    images: [
      {
        url: "/images/interior-feature-wall.png",
        width: 1200,
        height: 630,
        alt: "Dream Catcher Study Lounge Interior and Green Wall",
      },
      {
        url: "/images/logo.jpg",
        width: 800,
        height: 800,
        alt: "Dream Catcher Study Lounge Logo",
      },
    ],
    videos: [
      {
        url: "https://dreamcatcherstudylounge.com/videos/study-lounge-experience.mp4",
        width: 1280,
        height: 720,
        type: "video/mp4",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Catcher Study Lounge | Premium Study Space in East Fort, Thrissur",
    description:
      "A silent, air-conditioned study space in East Fort, Thrissur for CA, CMA, ACCA, MBBS/NEET PG, PSC, and UPSC aspirants.",
    images: ["/images/interior-feature-wall.png"],
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: "https://dreamcatcherstudylounge.com/images/logo.jpg",
    description: siteConfig.description,
    telephone: [siteConfig.contact.phoneDisplayPrimary, siteConfig.contact.phoneDisplaySecondary],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near East Fort Junction",
      addressLocality: "Thrissur",
      addressRegion: "Kerala",
      postalCode: "680005",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.5265,
      longitude: 76.2231,
    },
    url: "https://dreamcatcherstudylounge.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "23:30",
      },
    ],
    priceRange: "₹₹",
    sameAs: [siteConfig.contact.instagramUrl],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Dream Catcher Study Lounge Tour | Silent Study Space in East Fort, Thrissur",
    description:
      "Cinematic walkthrough experience of Dream Catcher Study Lounge in East Fort, Thrissur. Discover peaceful individual air-conditioned cubicles, ergonomic seating, high-speed Wi-Fi, and 24/7 CCTV safety for CA, CMA, NEET PG, UPSC, and PSC aspirants.",
    thumbnailUrl: [
      "https://dreamcatcherstudylounge.com/images/interior-feature-wall.png",
      "https://dreamcatcherstudylounge.com/images/interior-real.png",
      "https://dreamcatcherstudylounge.com/images/logo.jpg",
    ],
    uploadDate: "2024-01-15T09:00:00+05:30",
    duration: "PT10S",
    contentUrl: "https://dreamcatcherstudylounge.com/videos/study-lounge-experience.mp4",
    embedUrl: "https://dreamcatcherstudylounge.com/#tour",
    publisher: {
      "@type": "Organization",
      name: "Dream Catcher Study Lounge",
      logo: {
        "@type": "ImageObject",
        url: "https://dreamcatcherstudylounge.com/images/logo.jpg",
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      </head>
      <body className="bg-[#0c1814] text-[#E6EAE8] selection:bg-[#C9A24B] selection:text-[#12302A]">
        <LoadingScreen />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
