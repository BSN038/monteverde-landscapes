/* =========================================================
   Root Layout – Monteverde Landscapes
   Defines global HTML structure and metadata.
   ========================================================= */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Monteverde Landscapes",
    template: "%s | Monteverde Landscapes",
  },
  description:
    "Premium landscaping and garden maintenance services. Designed outdoor spaces built to last.",
  openGraph: {
    title: "Monteverde Landscapes",
    description:
      "Premium landscaping and garden maintenance services. Designed outdoor spaces built to last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
