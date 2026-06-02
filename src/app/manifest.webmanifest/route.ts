import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "Dora Food Map",
    short_name: "Dora",
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
