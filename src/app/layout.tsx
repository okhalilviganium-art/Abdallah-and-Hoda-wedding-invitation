import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariam & Omar Wedding",
  description: "You're invited to celebrate the wedding of Mariam & Omar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}