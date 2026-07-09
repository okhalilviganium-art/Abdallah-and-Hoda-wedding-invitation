import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdallah-and-hoda-wedding-invitatio.vercel.app"),

  title: "Abdallah & Hoda Wedding Invitation",
  description: "You're invited to celebrate the wedding of Abdallah & Hoda ❤️",

  openGraph: {
    title: "Abdallah & Hoda Wedding Invitation",
    description: "Join us in celebrating our special day ❤️",
    url: "https://abdallah-and-hoda-wedding-invitatio.vercel.app",
    siteName: "Abdallah & Hoda Wedding",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdallah & Hoda Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Abdallah & Hoda Wedding Invitation",
    description: "You're invited to celebrate our special day ❤️",
    images: ["/images/og-image.jpg"],
  },
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