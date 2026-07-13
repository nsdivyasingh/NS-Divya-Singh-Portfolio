import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NS Divya Singh | AI Engineer & Researcher",
  description:
    "Portfolio of NS Divya Singh — AI Engineer, Researcher, and Builder specialising in LLMs, intelligent systems, and applied AI that creates real-world value.",
  keywords: ["AI Engineer", "Machine Learning", "LLM", "Researcher", "Full-Stack", "Portfolio"],
  authors: [{ name: "NS Divya Singh" }],
  openGraph: {
    title: "NS Divya Singh | AI Engineer & Researcher",
    description:
      "AI Engineer, Researcher, and Builder — specialising in LLMs, intelligent systems, and applied AI.",
    siteName: "NS Divya Singh",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NS Divya Singh | AI Engineer & Researcher",
    description:
      "AI Engineer, Researcher, and Builder — specialising in LLMs, intelligent systems, and applied AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
