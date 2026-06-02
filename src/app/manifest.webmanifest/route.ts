import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "Locco",
    short_name: "Locco",
    description: "Singapore social food map for trusted lists.",
    start_url: "/app/map",
    display: "standalone",
    background_color: "#fff8ef",
    theme_color: "#f36b4f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      }
    ]
  });
}
