import { NextResponse } from "next/server";
import { mapReverseGeocodingResult } from "@/lib/geocoding/reverse-geocoding";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Missing lat/lon parameters." },
      { status: 400 },
    );
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`,
    {
      headers: {
        "User-Agent": "Nexa/0.1 reverse-geocoding",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(null, { status: 200 });
  }

  const data = await response.json();
  const suggestion = mapReverseGeocodingResult(data);

  return NextResponse.json(suggestion);
}
