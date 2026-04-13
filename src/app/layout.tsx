import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azad Zindagi Foundation - Empowering Lives, Protecting Children",
  description: "Azad Zindagi Foundation is a registered NGO dedicated to child safety, education, and empowering underprivileged communities across India. Donate now to make a difference.",
  keywords: "NGO, child safety, education, India, donation, charity, empowerment, Azad Zindagi Foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
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
