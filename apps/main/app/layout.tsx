import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apta Prep",
  description:
    "Unofficial graduate test practice platform for LSAT, GRE, GMAT, and MCAT preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}