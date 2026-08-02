import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azad Zindagi Foundation - Protecting Children and Ending Trafficking",
  description: "Azad Zindagi Foundation is a Section 8 company in Maharashtra working for rescued, missing, and trafficked children through tracing, awareness, education, and community action.",
  keywords: "Azad Zindagi Foundation, child protection, trafficking, missing children, POCSO, Section 8 company, Maharashtra, education, awareness",
  verification: {
    google: "L-d3cn7MrKsycYxpIroo1yBBYx7T8mGy6oSGKg7Xeus",
  },
  openGraph: {
    title: "Azad Zindagi Foundation",
    description: "Working for rescued, missing, and trafficked children through tracing, awareness, education, and community action in Maharashtra.",
    url: "https://azad-zindagi.vercel.app",
    siteName: "Azad Zindagi Foundation",
    images: [
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
    images: ["/about-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
