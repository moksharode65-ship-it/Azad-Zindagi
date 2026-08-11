import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azadzindagifoundation.org"),
  title: "Azad Zindagi Foundation - Protecting Children and Ending Trafficking",
  description: "Azad Zindagi Foundation is a Section 8 company in Maharashtra working for rescued, missing, and trafficked children through tracing, awareness, education, and community action.",
  keywords: "Azad Zindagi Foundation, child protection, trafficking, missing children, POCSO, Section 8 company, Maharashtra, education, awareness",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo-updated.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "L-d3cn7MrKsycYxpIroo1yBBYx7T8mGy6oSGKg7Xeus",
  },
  openGraph: {
    title: "Azad Zindagi Foundation",
    description: "Working for rescued, missing, and trafficked children through tracing, awareness, education, and community action in Maharashtra.",
    url: "https://azadzindagifoundation.org",
    siteName: "Azad Zindagi Foundation",
    images: [
      {
        url: "/logo-updated.png",
        width: 500,
        height: 500,
        alt: "Azad Zindagi Foundation Logo",
      },
      {
        url: "/about-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Azad Zindagi Foundation - Protecting Children",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azad Zindagi Foundation",
    description: "Working for rescued, missing, and trafficked children through tracing, awareness, education, and community action.",
    images: ["/logo-updated.png", "/about-image.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Azad Zindagi Foundation",
  "url": "https://azadzindagifoundation.org",
  "logo": "https://azadzindagifoundation.org/logo-updated.png",
  "description": "Azad Zindagi Foundation is a Section 8 company in Maharashtra working for rescued, missing, and trafficked children through tracing, awareness, education, and community action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
