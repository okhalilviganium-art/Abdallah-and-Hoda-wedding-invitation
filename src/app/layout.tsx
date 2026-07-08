import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdallah & Hoda",
  description: "You're invited to celebrate the wedding of Mazen & Diana",
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
