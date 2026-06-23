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
