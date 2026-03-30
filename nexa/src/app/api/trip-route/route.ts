import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coordinates = searchParams.get("coordinates");

  if (!coordinates) {
    return NextResponse.json(
      { error: "Missing coordinates parameter." },
      { status: 400 },
    );
  }

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Routing request failed." },
      { status: response.status },
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
