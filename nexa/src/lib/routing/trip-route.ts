import type { Place } from "@/types/entities";

export type RouteCoordinate = [number, number];

function hasValidCoordinates(place: Place) {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

export function getStraightLineRouteCoordinates(
  places: Place[],
): RouteCoordinate[] {
  return places
    .filter(hasValidCoordinates)
    .map((place) => [place.longitude, place.latitude] as RouteCoordinate);
}

export async function getStreetRouteCoordinates(
  places: Place[],
): Promise<RouteCoordinate[] | null> {
  const coordinates = getStraightLineRouteCoordinates(places);

  if (coordinates.length < 2) {
    return coordinates;
  }

  const coordinateString = coordinates
    .map(([longitude, latitude]) => `${longitude},${latitude}`)
    .join(";");

  const response = await fetch(`/api/trip-route?coordinates=${encodeURIComponent(coordinateString)}`);

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    code?: string;
    routes?: Array<{
      geometry?: {
        coordinates?: RouteCoordinate[];
      };
    }>;
  };

  if (data.code !== "Ok") {
    return null;
  }

  const routeCoordinates = data.routes?.[0]?.geometry?.coordinates;

  if (!routeCoordinates || routeCoordinates.length === 0) {
    return null;
  }

  return routeCoordinates;
}
