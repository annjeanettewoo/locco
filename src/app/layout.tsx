import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Locco",
  description: "A Singapore social food map powered by trusted friends' saved places.",
  applicationName: "Locco",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Locco",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#f36b4f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
